import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import 'dotenv/config'
import { randomInt } from 'crypto'
import { Restaurant } from '../src/models/restraurant.model.js'

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
    const menuItems = randomInt(1, 10)
    const menu = []
    for (let i = 0; i < menuItems; i++) {
      const item = faker.commerce.productName()
      const price = randomInt(1, 100)
      menu.push({ item, price })
    }

    const restro = new Restaurant({
      _id: new mongoose.Types.ObjectId(),
      name: faker.company.name(),
      location: faker.location.streetAddress(),
      menu,
      status: faker.helpers.arrayElement(['online', 'offline'])
    })

    await restro.save()
  }

  await mongoose.connection.close()
}

seedData().catch(console.error)
