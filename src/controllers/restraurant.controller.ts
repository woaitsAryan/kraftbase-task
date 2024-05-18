import catchAsync from '../helpers/catchAsync.js'
import { type Request, type Response } from 'express'
import { Restaurant } from '../models/restaurant.model.js'
import { createRestaurantSchema, updateRestaurantSchema } from '../schema/restaurant.schema.js'
import { Order } from '../models/delivery.model.js'
import mongoose from 'mongoose'
import { clearCache } from '../helpers/cache.js'

export const GetRestaurantDetailsController = catchAsync(
  async (req: Request, res: Response) => {
    const restaurantId = req.params.restaurantId

    const restaurant = await Restaurant.findById(restaurantId)
    if (restaurant == null) {
      return res.status(404).json({
        message: 'Restaurant not found'
      })
    }

    return res.json({ restaurant, message: 'Restaurant found' })
  }
)

export const CreateRestaurantController = catchAsync(
  async (req: Request, res: Response) => {
    const validatedBody = createRestaurantSchema.safeParse(req.body)
    if (!validatedBody.success) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const restaurant = await Restaurant.create({
      _id: new mongoose.Types.ObjectId(),
      name: validatedBody.data.name,
      location: validatedBody.data.location,
      menu: validatedBody.data.menu,
      description: validatedBody.data.description
    })

    void clearCache()

    return res.json({ restaurant, message: 'Restaurant created' })
  }
)

export const UpdateRestaurantController = catchAsync(
  async (req: Request, res: Response) => {
    const restaurantId = req.params.restaurantId
    const validatedBody = updateRestaurantSchema.safeParse(req.body)
    if (!validatedBody.success) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }
    if (Object.keys(validatedBody.data).length === 0) {
      return res.status(400).json({
        message: 'No fields to update'
      })
    }

    const restaurant = await Restaurant.findById(restaurantId)
    if (restaurant == null) {
      return res.status(404).json({
        message: 'Restaurant not found'
      })
    }

    if (validatedBody.data.status !== null && validatedBody.data.status !== undefined) {
      if (!['online', 'offline'].includes(validatedBody.data.status)) {
        return res.status(400).json({
          message: 'Invalid status'
        })
      }
      restaurant.status = validatedBody.data.status
    }
    if (validatedBody.data.menu !== null && validatedBody.data.menu !== undefined) {
      restaurant.menu = validatedBody.data.menu
    }

    return res.json({ restaurant, message: 'Restaurant updated' })
  }
)

export const RestaurantGetOrdersController = catchAsync(
  async (req: Request, res: Response) => {
    const restaurantId = req.params.restaurantId

    const restaurant = await Restaurant.findById(restaurantId).populate('orders')
    if (restaurant == null) {
      return res.status(404).json({
        message: 'Restaurant not found'
      })
    }
    return res.json({ orders: restaurant.orders, message: 'Orders found' })
  }
)

export const RestaurantUpdateOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const restaurantId = req.params.restaurantId
    const orderId = req.params.orderId
    const status = req.body.status as string | null

    if (status == null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const restaurant = await Restaurant.findById(restaurantId)
    if (restaurant == null) {
      return res.status(404).json({
        message: 'Restaurant not found'
      })
    }

    const order = await Order.findById(orderId)
    if (order == null) {
      return res.status(404).json({
        message: 'Order not found'
      })
    }
    // TODO: Check if the order belongs to the restaurant

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid status'
      })
    }

    order.status = status
    await order.save()

    return res.json({ message: 'Order updated' })
  }
)
