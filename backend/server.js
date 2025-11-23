import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import errorHandler from './middleware/errorHandler.js'

dotenv.config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {})
