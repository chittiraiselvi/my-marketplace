
const UserSchema = new mongoose.Schema({
  name:  String,
  email: { type: String, unique: true },
  role:  { type: String, enum: ['buyer','seller','admin'] },
  trustScore: { type: Number, default: 50 },
})