import mongoose, { type Document, Schema } from 'mongoose'

export interface RestaurantType extends Document {
  _id: Schema.Types.ObjectId
  name: string
  menu: Array<{ item: string, price: number }>
  status: string
  orders: Schema.Types.ObjectId[]
}

const restaurantSchema = new mongoose.Schema<RestaurantType>({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  menu: [{ item: { type: String }, price: { type: Number } }],
  status: { type: String, enum: ['online', 'offline'], default: 'offline' },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
})

const Restaurant = mongoose.model<RestaurantType>('Restaurant', restaurantSchema)

export { Restaurant }
