import React, { useEffect, useRef } from 'react'
import TaskForm from './TaskForm'

export default function TaskModal({ open, onClose, editingTask, onSaved }) {
  const ref = useRef(null)
  const instance = useRef(null)

  useEffect(() => {
    if (!ref.current || !window.bootstrap) return
    instance.current = new window.bootstrap.Modal(ref.current, { backdrop: 'static' })
    const handler = () => onClose && onClose()
    ref.current.addEventListener('hidden.bs.modal', handler)
    return () => {
      ref.current && ref.current.removeEventListener('hidden.bs.modal', handler)
      instance.current && instance.current.dispose && instance.current.dispose()
    }
  }, [])

  useEffect(() => {
    if (!instance.current) return
    if (open) instance.current.show()
    else instance.current.hide()
  }, [open])

  return (
    <div ref={ref} className="modal fade" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content tm-card">
          <div className="modal-header">
            <h5 className="modal-title">{editingTask ? 'Edit Task' : 'Create Task'}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <TaskForm editingTask={editingTask} onSaved={onSaved} onCancel={onClose} />
          </div>
        </div>
      </div>
    </div>
  )
}
