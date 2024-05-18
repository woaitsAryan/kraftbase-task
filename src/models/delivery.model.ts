import mongoose, { type Document, Schema } from 'mongoose'

export interface OrderType extends Document {
  _id: Schema.Types.ObjectId
  userId: Schema.Types.ObjectId
  restaurantId: Schema.Types.ObjectId
  items: Array<{ item: string, price: number }>
  status: string
  deliveryAgentId: Schema.Types.ObjectId
  review: string
}

const orderSchema = new mongoose.Schema<OrderType>({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [{ item: { type: String }, price: { type: Number }, quantity: { type: Number } }],
  status: { type: String, enum: ['placed', 'accepted', 'rejected', 'delivered'], default: 'placed' },
  deliveryAgentId: { type: Schema.Types.ObjectId, ref: 'DeliveryAgent' },
  review: { type: String }
})

const Order = mongoose.model<OrderType>('Order', orderSchema)

export interface DeliveryAgentType extends Document {
  _id: Schema.Types.ObjectId
  name: string
  status: string
  orders: Schema.Types.ObjectId[]
}

const deliveryAgentSchema = new mongoose.Schema<DeliveryAgentType>({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  status: { type: String, enum: ['online', 'offline'], default: 'online' },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
})

const DeliveryAgent = mongoose.model<DeliveryAgentType>('DeliveryAgent', deliveryAgentSchema)

export { Order, DeliveryAgent }
