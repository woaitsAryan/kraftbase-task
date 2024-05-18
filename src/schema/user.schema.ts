import { z } from 'zod'

const placeOrderSchema = z.object({
  restaurantId: z.string(),
  items: z.array(z.object({
    item: z.string(),
    quantity: z.number(),
    price: z.number()
  }))
})

const reviewSchema = z.object({
  review: z.string(),
  rating: z.number()
})

export { placeOrderSchema, reviewSchema }
