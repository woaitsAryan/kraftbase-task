import express from 'express'

const healthRouter = express.Router()

healthRouter.get('/', (_req, res) => {
  res.send('Server is up and running')
})

export default healthRouter
