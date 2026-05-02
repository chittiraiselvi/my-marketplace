import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    
    const mongoose = await import('mongoose')
    const bcrypt = await import('bcryptjs')
    
    const MONGODB_URI = process.env.MONGODB_URI!
    if (mongoose.default.connection.readyState < 1) {
      await mongoose.default.connect(MONGODB_URI)
    }

    const UserSchema = new mongoose.default.Schema({
      name: String,
      email: { type: String, unique: true },
      password: String,
      role: { type: String, default: 'buyer' },
    })
    const User = mongoose.default.models.User || 
      mongoose.default.model('User', UserSchema)

    const user = await User.findOne({ email })
    if (!user)
      return NextResponse.json({ error: 'Email not found' }, { status: 400 })

    const match = await bcrypt.default.compare(password, user.password)
    if (!match)
      return NextResponse.json({ error: 'Wrong password' }, { status: 400 })

    return NextResponse.json({ 
      message: 'Login successful!', 
      user: { name: user.name, email: user.email, role: user.role } 
    })
  } catch (e) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}