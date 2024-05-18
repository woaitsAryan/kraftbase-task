import catchAsync from '../helpers/catchAsync.js'
import { type Request, type Response } from 'express'
import { Order } from '../models/delivery.model.js'

export const GetDeliveryDetailsController = catchAsync(
  async (req: Request, res: Response) => {
    const orderId = req.params.orderId

    const delivery = await Order.findById(orderId)
    if (delivery == null) {
      return res.status(404).json({
        message: 'Delivery not found'
      })
    }

    return res.json({ delivery, message: 'Delivery found' })
  }
)
