import express from 'express'
import { CreateRestaurantController, GetRestaurantDetailsController, RestaurantGetOrdersController, RestaurantUpdateOrderController, UpdateRestaurantController } from '../controllers/restraurant.controller.js'

const restaurantRouter = express.Router()

restaurantRouter.get('/:restaurantId', GetRestaurantDetailsController)
restaurantRouter.post('/', CreateRestaurantController)
restaurantRouter.put('/:restaurantId', UpdateRestaurantController)
restaurantRouter.get('/orders/:restaurantId', RestaurantGetOrdersController)
restaurantRouter.put('/orders/:restaurantId/:orderId', RestaurantUpdateOrderController)

// TODO - Add restaurant roles and permissions middleware

export default restaurantRouter
