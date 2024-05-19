import mongoose, { type Document, Schema } from 'mongoose'

export interface RestaurantType extends Document {
  _id: Schema.Types.ObjectId
  name: string
  description: string
  location: string
  menu: Array<{ item: string, price: number }>
  status: string
  orders: Schema.Types.ObjectId[]
  total_orders: number
  rating: number
}

const restaurantSchema = new mongoose.Schema<RestaurantType>({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  menu: [{ item: { type: String }, price: { type: Number } }],
  status: { type: String, enum: ['online', 'offline'], default: 'offline' },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  total_orders: { type: Number, default: 0 },
  rating: { type: Number, min: 1, max: 5, default: 5 }
})

const Restaurant = mongoose.model<RestaurantType>('Restaurant', restaurantSchema)

export { Restaurant }
