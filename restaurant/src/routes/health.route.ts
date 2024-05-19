import express from 'express'

const healthRouter = express.Router()

healthRouter.get('/', (_req, res) => {
    res.status(200).json({
        message: 'Restaurant microservice healthy!',
    })
})

export default healthRouter