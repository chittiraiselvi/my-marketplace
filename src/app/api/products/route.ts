import { NextResponse } from 'next/server'
import mongoose, { Schema } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/marketplace'

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return
  await mongoose.connect(MONGODB_URI)
}

const ProductSchema = new Schema({
  name:  { type: String, required: true },
  price: { type: Number, required: true },
  approved: { type: Boolean, default: false },
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

export async function GET() {
  await connectDB()
  const products = await Product.find()
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()
  const product = await Product.create(body)
  return NextResponse.json(product, { status: 201 })
}
