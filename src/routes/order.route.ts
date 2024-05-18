import express from 'express'
import { GetDeliveryDetailsController } from '../controllers/delivery.controller.js'

const orderRouter = express.Router()

orderRouter.get('/:orderId', GetDeliveryDetailsController)

export default orderRouter
