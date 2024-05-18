import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import 'dotenv/config'
import { DeliveryAgent } from '../src/models/delivery.model.js'

async function seedData (): Promise<void> {
  const DB_HOST = process.env.DB_HOST
  const DB_PORT = process.env.DB_PORT
  const DB_USER = process.env.DB_USER
  const DB_PASSWORD = process.env.DB_PASSWORD
  const DB_DATABASE = process.env.DB_DATABASE
  if ((DB_HOST == null) || (DB_PORT == null) || (DB_USER == null) || (DB_PASSWORD == null) || (DB_DATABASE == null)) {
    throw new Error('Missing environment variables')
  }
  const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`

  await mongoose.connect(url)

  for (let i = 0; i < 100; i++) {
    const deliveryAgent = new DeliveryAgent({
      _id: new mongoose.Types.ObjectId(),
      name: faker.person.fullName(),
      status: faker.helpers.arrayElement(['online', 'offline'])
    })

    await deliveryAgent.save()
  }

  await mongoose.connection.close()
}

seedData().catch(console.error)
