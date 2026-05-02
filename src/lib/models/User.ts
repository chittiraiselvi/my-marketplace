import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  name:     { type: String, required: true },
  email:    { type: String, unique: true, required: true },
  password: String,
  role:     { type: String, enum: ['buyer','seller','admin'], default: 'buyer' },
  avatar:   String,
}, { timestamps: true })

export default mongoose.models.User ||
  mongoose.model('User', UserSchema)