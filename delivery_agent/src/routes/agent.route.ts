import express from 'express'
import { CreateAgentController, GetDeliveryAgentOrdersController, StartDeliveryAgentOrderController } from '../controllers/agent.controller.js'

const agentRouter = express.Router()

agentRouter.get('/:agentId', GetDeliveryAgentOrdersController)
agentRouter.put('/:agentId/:orderId', StartDeliveryAgentOrderController)
agentRouter.post('/', CreateAgentController)

export default agentRouter