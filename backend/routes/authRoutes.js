import { Router } from 'express'
import { body } from 'express-validator'
import { signup, login, logout } from '../controllers/authController.js'

const router = Router()

router.post(
  '/signup',
  [body('email').isEmail().withMessage('Invalid email'), body('password').isLength({ min: 6 }).withMessage('Password too short')],
  signup
)

router.post(
  '/login',
  [body('email').isEmail().withMessage('Invalid email'), body('password').isLength({ min: 6 }).withMessage('Password too short')],
  login
)

router.post('/logout', logout)

export default router
