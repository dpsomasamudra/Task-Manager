import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email']
  },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

userSchema.index({ email: 1 }, { unique: true })

export default mongoose.model('User', userSchema)
