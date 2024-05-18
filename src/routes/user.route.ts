import express from 'express'
import { protect } from '../middleware/protect.middleware.js'
import { GetOrderStatusController, GetResturantsController, LeaveReviewController, PlaceOrderController } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.get('/restaurant', GetResturantsController)
userRouter.post('/restaurant', protect, PlaceOrderController)
userRouter.get('/status/:orderId', protect, GetOrderStatusController)
userRouter.post('/review/:orderId', protect, LeaveReviewController)

export default userRouter
