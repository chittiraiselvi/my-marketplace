import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password)
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })

    const mongoose = await import('mongoose')
    const bcrypt = await import('bcryptjs')

    if (mongoose.default.connection.readyState < 1) {
      await mongoose.default.connect(process.env.MONGODB_URI!)
    }

    const UserSchema = new mongoose.default.Schema({
      name: String,
      email: String,
      password: String,
      role: String,
    })
    const User = mongoose.default.models.User || 
      mongoose.default.model('User', UserSchema)

    const exists = await User.findOne({ email: email })
    if (exists)
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })

    const hashed = await bcrypt.default.hash(password, 10)
    await User.create({ name, email, password: hashed, role: 'buyer' })

    return NextResponse.json({ message: 'Account created successfully!' })
  } catch (e) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}