import express from 'express'
import { CreateRestaurantController, GetRestaurantDetailsController, RestaurantGetOrdersController, RestaurantUpdateOrderController, UpdateRestaurantController } from '../controllers/restraurant.controller.js'

const restaurantRouter = express.Router()

restaurantRouter.get('/:id', GetRestaurantDetailsController)
restaurantRouter.post('/', CreateRestaurantController)
restaurantRouter.put('/:id', UpdateRestaurantController)
restaurantRouter.get('/orders/:id', RestaurantGetOrdersController)
restaurantRouter.put('/orders/:id/:orderId', RestaurantUpdateOrderController)

// TODO - Add restaurant roles and permissions middleware

export default restaurantRouter
