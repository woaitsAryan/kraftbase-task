import catchAsync from '../helpers/catchAsync.js'
import { type Request, type Response } from 'express'
import { Restaurant } from '../models/restaurant.model.js'
import { placeOrderSchema, reviewSchema } from '../schema/user.schema.js'
import { DeliveryAgent, Order } from '../models/delivery.model.js'
import mongoose from 'mongoose'
import { User, type UserType } from '../models/user.model.js'

export const GetResturantsController = catchAsync(
  async (req: Request, res: Response) => {
    const page = req.query.page == null ? 1 : parseInt(req.query.page as string)
    const limit = req.query.limit == null ? 10 : parseInt(req.query.limit as string)
    const skip = (page - 1) * limit

    const restaurants = await Restaurant.find({ status: 'online' })
      .skip(skip)
      .limit(limit)

    return res.json({ restaurants, message: 'Restaurants fetched successfully' })
  })

export const PlaceOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.body.user as UserType
    const validatedBody = placeOrderSchema.safeParse(req.body)

    if (!validatedBody.success || user == null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const { restaurantId, items } = validatedBody.data

    const restaurant = await Restaurant.findById(restaurantId)
    if (restaurant == null) {
      return res.status(404).json({
        message: 'Restaurant not found'
      })
    }

    const restaurantMenu = restaurant.menu
    let total = 0
    const validItems = items.filter(item => {
      const menuItem = restaurantMenu.find(menuItem => menuItem.item === item.item)
      if (menuItem != null && menuItem.price === item.price) {
        total += menuItem.price * item.quantity // Multiply the price by the quantity and add it to the total
        return true
      }
      return false
    })

    const availableDeliveryAgent = await DeliveryAgent.findOne({ status: 'online' })
    if (availableDeliveryAgent == null) {
      return res.status(500).json({
        message: 'No delivery agent available'
      })
    }

    const newOrder = new Order({
      _id: new mongoose.Types.ObjectId(),
      userId: user._id,
      restaurantId,
      items: validItems,
      status: 'placed',
      deliveryAgentId: availableDeliveryAgent._id,
      price: total
    })

    await newOrder.save()

    availableDeliveryAgent.orders.push(newOrder._id)
    availableDeliveryAgent.status = 'busy'
    restaurant.orders.push(newOrder._id)

    await availableDeliveryAgent.save()
    await restaurant.save()

    return res.json({ message: 'Order placed successfully', orderId: newOrder._id })
  })

export const GetOrderStatusController = catchAsync(
  async (req: Request, res: Response) => {
    const orderId = req.params.orderId
    if (orderId == null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }
    const order = await Order.findById(orderId)
    if (order == null) {
      return res.status(404).json({
        message: 'Order not found'
      })
    }
    const deliveryAgent = await DeliveryAgent.findById(order.deliveryAgentId)
    if (deliveryAgent == null) {
      return res.status(404).json({
        message: 'Delivery agent not found'
      })
    }
    return res.json({ status: order.status, agent_name: deliveryAgent.name })
  }
)

export const LeaveReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const orderId = req.params.orderId
    const user = req.body.user as UserType
    const validatedBody = reviewSchema.safeParse(req.body)

    if (!validatedBody.success || user == null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const { rating, review } = validatedBody.data

    const order = await Order.findById(orderId)
    if (order == null) {
      return res.status(404).json({
        message: 'Order not found'
      })
    }
    if (order.status !== 'enroute') {
      return res.status(400).json({
        message: 'Order not delivered'
      })
    }

    const deliveryAgent = await DeliveryAgent.findById(order.deliveryAgentId)
    if (deliveryAgent == null) {
      return res.status(404).json({
        message: 'Delivery agent not found'
      })
    }

    const restaurant = await Restaurant.findById(order.restaurantId)
    if (restaurant == null) {
      return res.status(404).json({
        message: 'Restaurant not found'
      })
    }

    const orderUser = await User.findById(order.userId)
    if (orderUser == null) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    if (orderUser._id.toString() !== user._id.toString()) {
      return res.status(403).json({
        message: 'Unauthorized'
      })
    }
    const totalOrders = restaurant.total_orders
    const currentRating = restaurant.rating * totalOrders + rating / (totalOrders + 1)
    restaurant.rating = currentRating
    restaurant.total_orders = totalOrders + 1
    order.review = review
    order.status = 'delivered'
    deliveryAgent.status = 'online'

    await restaurant.save()
    await order.save()
    await deliveryAgent.save()

    return res.json({ message: 'Review added successfully' })
  }
)
