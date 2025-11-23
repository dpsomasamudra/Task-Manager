import jwt from 'jsonwebtoken'

export default function auth(req, res, next) {
  const header = req.headers.authorization || ''
  const parts = header.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const decoded = jwt.verify(parts[1], process.env.JWT_SECRET)
    req.user = { userId: decoded.userId }
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
