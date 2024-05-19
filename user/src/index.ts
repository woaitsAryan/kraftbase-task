import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import getEnv from './helpers/getEnv.js'
import connectToDB from './initializers/db.js'
import errorHandler from './middleware/error.middleware.js'
import authRouter from './routes/auth.route.js'
import mongoSanitize from 'express-mongo-sanitize'
import userRouter from './routes/user.route.js'
import { connectToRedis } from './initializers/redis.js'
import healthRouter from './routes/health.route.js'

const app = express()
const PORT = getEnv.PORT

void connectToDB()
void connectToRedis()

app.use(mongoSanitize())

app.use(cors())
app.use(express.json())
app.use(helmet())

if (getEnv.ENVIRONMENT === 'dev') app.use(morgan('dev'))

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/health', healthRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})

export default app
