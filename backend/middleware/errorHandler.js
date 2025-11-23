export default function errorHandler(err, req, res, next) {
  let status = err.status || 500
  let message = err.message || 'Server error'
  if (err.name === 'ValidationError') {
    status = 400
    message = Object.values(err.errors).map(e => e.message).join(', ')
  } else if (err.name === 'CastError') {
    status = 400
    message = 'Invalid ID'
  } else if (err.code === 11000) {
    status = 400
    message = 'Duplicate value'
  }
  res.status(status).json({ error: message })
}
