import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    
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

    const user = await User.findOne({ email: email })
    if (!user)
      return NextResponse.json({ error: 'Email not found' }, { status: 400 })

    const match = await bcrypt.default.compare(password, user.password as string)
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