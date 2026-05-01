import mongoose, { Schema } from 'mongoose'

const OrderSchema = new Schema({
  buyer:  { type: Schema.Types.ObjectId, ref: 'User' },
  vendor: { type: Schema.Types.ObjectId, ref: 'User' },
  items:  [{ product: { type: Schema.Types.ObjectId, ref: 'Product' }, qty: Number, price: Number }],
  total:  Number,
  status: { type: String, enum: ['pending','paid','shipped','delivered'], default: 'pending' },
}, { timestamps: true })

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)
