import React, { useEffect, useState } from 'react'
import { createTask, updateTask } from '../services/api'

export default function TaskForm({ editingTask, onSaved, onCancel }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [status, setStatus] = useState('Incomplete')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '')
      setDescription(editingTask.description || '')
      setPriority(editingTask.priority || 'Medium')
      setDeadline(editingTask.deadline ? editingTask.deadline.slice(0, 10) : '')
      setStatus(editingTask.status || 'Incomplete')
    } else {
      setTitle('')
      setDescription('')
      setPriority('Medium')
      setDeadline('')
      setStatus('Incomplete')
    }
  }, [editingTask])

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (deadline) {
        const dd = new Date(deadline)
        const today = new Date()
        dd.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)
        if (dd < today) {
          setError('Deadline cannot be in the past')
          setLoading(false)
          return
        }
      }
      const payload = { title, description, deadline: deadline ? new Date(deadline) : undefined, priority, status }
      if (editingTask) await updateTask(editingTask._id, payload)
      else await createTask(payload)
      onSaved()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card tm-card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>{editingTask ? 'Edit Task' : 'Create Task'}</span>
        {editingTask && (
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onCancel}>Cancel</button>
        )}
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-card-text"></i></span>
              <input className="form-control tm-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" required />
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Deadline</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-calendar-event"></i></span>
              <input type="date" className="form-control tm-input" value={deadline} onChange={e => setDeadline(e.target.value)} min={new Date().toISOString().slice(0,10)} />
            </div>
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-text-paragraph"></i></span>
              <textarea className="form-control tm-textarea" value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the task" required />
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Priority</label>
            <select className="form-select tm-select" value={priority} onChange={e => setPriority(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          {editingTask && (
            <div className="col-md-4">
              <label className="form-label">Status</label>
              <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                <option>Incomplete</option>
                <option>Completed</option>
              </select>
            </div>
          )}
          <div className={`col-md-${editingTask ? '4' : '8'} d-flex align-items-end justify-content-end`}>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
              Save Task
            </button>
          </div>
          {error && <div className="col-12"><div className="alert alert-danger">{error}</div></div>}
        </div>
      </div>
    </form>
  )
}
