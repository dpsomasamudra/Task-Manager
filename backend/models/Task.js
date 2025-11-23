import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ['Completed', 'Incomplete'],
      default: 'Incomplete'
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    }
  },
  { timestamps: true }
)

export default mongoose.model('Task', taskSchema)
