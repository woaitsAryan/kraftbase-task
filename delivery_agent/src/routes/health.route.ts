import express from 'express'

const healthRouter = express.Router()

healthRouter.get('/', (_req, res) => {
  res.send('Delivery agent microservice is healthy!')
})

export default healthRouter