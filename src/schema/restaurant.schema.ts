import { z } from 'zod'

const createRestaurantSchema = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
  menu: z.array(z.object({
    item: z.string(),
    price: z.number()
  }))
})

const updateRestaurantSchema = z.object({
  status: z.string().optional(),
  menu: z.array(z.object({
    item: z.string(),
    price: z.number()
  })).optional()
})

export { createRestaurantSchema, updateRestaurantSchema }
