import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import User from '@/lib/models/User'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    await connectDB()
    const user = await User.findOne({ email })
    if (!user)
      return NextResponse.json({ error: 'Email not found' }, { status: 400 })

    const match = await bcrypt.compare(password, user.password)
    if (!match)
      return NextResponse.json({ error: 'Wrong password' }, { status: 400 })

    return NextResponse.json({ message: 'Login successful!', user: { name: user.name, email: user.email, role: user.role } })
  } catch (e) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}