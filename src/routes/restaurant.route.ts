import express from 'express'
import { CreateRestaurantController, GetRestaurantDetailsController, RestaurantGetOrdersController, RestaurantUpdateOrderController, UpdateRestaurantController } from '../controllers/restraurant.controller.js'

const restraurantRouter = express.Router()

restraurantRouter.get('/:id', GetRestaurantDetailsController)
restraurantRouter.post('/', CreateRestaurantController)
restraurantRouter.put('/:id', UpdateRestaurantController)
restraurantRouter.get('/orders/:id', RestaurantGetOrdersController)
restraurantRouter.post('/orders/:id', RestaurantUpdateOrderController)

// TODO - Add restaurant roles and permissions middleware

export default restraurantRouter
