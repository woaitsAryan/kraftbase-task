import catchAsync from '../helpers/catchAsync.js'
import { type Request, type Response } from 'express'
import { DeliveryAgent, Order } from '../models/delivery.model.js'
import mongoose from 'mongoose'
import { CreateAgentSchema } from '../schema/agent.schema.js'

export const GetDeliveryAgentOrdersController = catchAsync(
  async (req: Request, res: Response) => {
    const deliveryAgentId = req.params.agentId

    const deliveryAgent = await DeliveryAgent.findById(deliveryAgentId).populate('orders')
    if (deliveryAgent == null) {
      return res.status(404).json({
        message: 'Agent not found'
      })
    }
    if (deliveryAgent.status === 'offline') {
      return res.status(403).json({
        message: 'Agent is offline'
      })
    }
    if (deliveryAgent.orders.length === 0) {
      return res.json({ orders: [], message: 'No orders found' })
    }

    return res.json({ orders: deliveryAgent.orders, message: 'Orders found' })
  }
)

export const StartDeliveryAgentOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const deliveryAgentId = req.params.agentId
    const orderId = req.params.orderId

    const order = await Order.findById(orderId)
    if (order == null) {
      return res.status(404).json({
        message: 'Order not found'
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    if (order.deliveryAgentId.toString() !== deliveryAgentId) {
      return res.status(403).json({
        message: 'Unauthorized'
      })
    }

    if (!['accepted'].includes(order.status)) {
      return res.status(400).json({
        message: 'Invalid status'
      })
    }

    order.status = 'enroute'
    await order.save()

    return res.json({ message: 'Order on the way' })
  }
)

export const CreateAgentController = catchAsync(
  async (req: Request, res: Response) => {
    const validatedBody = CreateAgentSchema.safeParse(req.body)
    if (!validatedBody.success) {
      return res.status(400).json({
        message: 'Invalid request body'
      })
    }

    const { name, phone } = validatedBody.data

    const agent = new DeliveryAgent({
      _id: new mongoose.Types.ObjectId(),
      name,
      phone
    })
    await agent.save()

    return res.json({ agent, message: 'Agent created' })
  }
)
