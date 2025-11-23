import { validationResult } from 'express-validator'
import Task from '../models/Task.js'

export const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array().map(e => e.msg).join(', ') })
    }
    const userId = req.user.userId
    const { title, description, deadline, status, priority } = req.body
    const task = await Task.create({ userId, title, description, deadline, status, priority })
    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
}

export const getTasks = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const { status, priority, search, page = 1, limit = 20 } = req.query
    const query = { userId }
    if (status) query.status = status
    if (priority) query.priority = priority
    if (search) query.title = { $regex: search, $options: 'i' }
    const skip = (Number(page) - 1) * Number(limit)
    const tasks = await Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit))
    res.json(tasks)
  } catch (err) {
    next(err)
  }
}

export const getTaskById = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const { id } = req.params
    const task = await Task.findOne({ _id: id, userId })
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.json(task)
  } catch (err) {
    next(err)
  }
}

export const updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array().map(e => e.msg).join(', ') })
    }
    const userId = req.user.userId
    const { id } = req.params
    const update = {}
    ;['title', 'description', 'deadline', 'status', 'priority'].forEach(k => {
      if (req.body[k] !== undefined) update[k] = req.body[k]
    })
    const task = await Task.findOneAndUpdate({ _id: id, userId }, update, { new: true, runValidators: true })
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.json(task)
  } catch (err) {
    next(err)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const { id } = req.params
    const task = await Task.findOneAndDelete({ _id: id, userId })
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.json({ message: 'Task deleted', task })
  } catch (err) {
    next(err)
  }
}
