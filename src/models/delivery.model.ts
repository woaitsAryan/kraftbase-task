import mongoose, { type Document, Schema } from 'mongoose'

export interface OrderType extends Document {
  _id: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
  restaurant: Schema.Types.ObjectId
  items: Array<{ item: string, price: number }>
  status: string
  deliveryAgent: Schema.Types.ObjectId
}

const orderSchema = new mongoose.Schema<OrderType>({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [{ item: { type: String }, price: { type: Number } }],
  status: { type: String, enum: ['placed', 'accepted', 'rejected', 'processed', 'delivered'], default: 'placed' },
  deliveryAgent: { type: Schema.Types.ObjectId, ref: 'DeliveryAgent' }
})

const Order = mongoose.model<OrderType>('Order', orderSchema)

export interface DeliveryAgentType extends Document {
  _id: Schema.Types.ObjectId
  name: string
  orders: Schema.Types.ObjectId[]
}

const deliveryAgentSchema = new mongoose.Schema<DeliveryAgentType>({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
})

const DeliveryAgent = mongoose.model<DeliveryAgentType>('DeliveryAgent', deliveryAgentSchema)

export { Order, DeliveryAgent }
