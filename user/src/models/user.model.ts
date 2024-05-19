import mongoose, { type Document, Schema } from 'mongoose'

export interface UserType extends Document {
  _id: Schema.Types.ObjectId
  email: string
  passwordHash: string
  name: string
  orders: Schema.Types.ObjectId[]
  ratings: Array<{ orderId: Schema.Types.ObjectId, rating: number }>
}

const userSchema = new mongoose.Schema<UserType>({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  ratings: [{ orderId: { type: Schema.Types.ObjectId, ref: 'Order' }, rating: { type: Number, min: 1, max: 5 } }]
})

const User = mongoose.model<UserType>('User', userSchema)

export { User }
