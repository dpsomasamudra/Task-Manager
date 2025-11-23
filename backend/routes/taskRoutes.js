import { Router } from 'express'
import { body, param } from 'express-validator'
import auth from '../middleware/auth.js'
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js'

const router = Router()

router.use(auth)

router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('deadline').optional().isISO8601().withMessage('Invalid deadline').custom(value => {
      const d = new Date(value)
      const today = new Date()
      d.setHours(0, 0, 0, 0)
      today.setHours(0, 0, 0, 0)
      return d >= today
    }).withMessage('Deadline cannot be in the past'),
    body('status').optional().isIn(['Completed', 'Incomplete']).withMessage('Invalid status'),
    body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority')
  ],
  createTask
)

router.get('/', getTasks)

router.get('/:id', [param('id').isMongoId().withMessage('Invalid ID')], getTaskById)

router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid ID'),
    body('title').optional().notEmpty().withMessage('Title is required'),
    body('description').optional().notEmpty().withMessage('Description is required'),
    body('deadline').optional().isISO8601().withMessage('Invalid deadline').custom(value => {
      const d = new Date(value)
      const today = new Date()
      d.setHours(0, 0, 0, 0)
      today.setHours(0, 0, 0, 0)
      return d >= today
    }).withMessage('Deadline cannot be in the past'),
    body('status').optional().isIn(['Completed', 'Incomplete']).withMessage('Invalid status'),
    body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority')
  ],
  updateTask
)

router.delete('/:id', [param('id').isMongoId().withMessage('Invalid ID')], deleteTask)

export default router
