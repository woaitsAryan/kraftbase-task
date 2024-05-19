import express from 'express'

const healthRouter = express.Router()

healthRouter.get('/', (_req, res) => {
  res.send('User microservice is up and running')
})

export default healthRouter
