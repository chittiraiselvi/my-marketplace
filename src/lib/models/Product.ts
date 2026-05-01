import mongoose, { Schema } from 'mongoose'

const ProductSchema = new Schema({
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  images:   [String],
  category: String,
  vendor:   { type: Schema.Types.ObjectId, ref: 'User' },
  stock:    { type: Number, default: 0 },
  approved: { type: Boolean, default: false },
  aiScore:  { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema)
