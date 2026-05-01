import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Product from '@/lib/models/Product'

// GET /api/products — All products fetch
export async function GET() {
  await connectDB()
  const products = await Product.find({ approved: true })
  return NextResponse.json(products)
}

// POST /api/products — New product add
export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()
  const product = await Product.create(body)
  return NextResponse.json(product, { status: 201 })
}