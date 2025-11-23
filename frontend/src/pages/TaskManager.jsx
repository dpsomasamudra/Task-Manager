import React, { useEffect, useState } from 'react'
import { getTasks, deleteTask as apiDeleteTask } from '../services/api'
import TaskForm from '../components/TaskForm'
import TaskFilters from '../components/TaskFilters'
import TaskList from '../components/TaskList'
import ConfirmModal from '../components/ConfirmModal'
import TaskModal from '../components/TaskModal'
import Toast from '../components/Toast.jsx'

export default function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editingTask, setEditingTask] = useState(null)
  const [status, setStatus] = useState('All')
  const [priority, setPriority] = useState('All')
  const [search, setSearch] = useState('')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [toastVar, setToastVar] = useState('success')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const list = await getTasks({ status, priority, search })
      setTasks(list)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, priority, search])

  const onSaved = async () => {
    setToastMsg(editingTask ? 'Task updated' : 'Task created')
    setToastVar('success')
    setToastOpen(true)
    setEditingTask(null)
    setEditModalOpen(false)
    await load()
  }

  const onDelete = async () => {
    if (!taskToDelete) return
    try {
      await apiDeleteTask(taskToDelete._id)
      setToastMsg('Task deleted')
      setToastVar('success')
      setToastOpen(true)
      setDeleteModalOpen(false)
      setTaskToDelete(null)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Tasks</h2>
        
      </div>
      <div className="container-fluid">
        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <TaskForm editingTask={editingTask} onSaved={onSaved} onCancel={() => setEditingTask(null)} />
          </div>
          <div className="col-12 col-lg-7">
            <TaskFilters status={status} setStatus={setStatus} priority={priority} setPriority={setPriority} search={search} setSearch={setSearch} />
            {status !== 'All' && <span className="badge bg-secondary me-2">{status}</span>}
            {priority !== 'All' && <span className="badge bg-secondary me-2">{priority}</span>}
            {search && <span className="badge bg-secondary">{search}</span>}
            {loading && <div className="alert alert-info animate__animated animate__fadeIn mt-3">Loading...</div>}
            {error && <div className="alert alert-danger animate__animated animate__shakeX mt-3">{error}</div>}
            <TaskList
              tasks={tasks}
              onEdit={t => { setEditingTask(t); setEditModalOpen(true) }}
              onDelete={t => { setTaskToDelete(t); setDeleteModalOpen(true) }}
            />
          </div>
        </div>
      </div>
      <ConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Task"
        message={taskToDelete ? `Delete "${taskToDelete.title}"? This cannot be undone.` : ''}
        confirmText="Delete"
        onConfirm={onDelete}
      />
      <TaskModal
        open={editModalOpen}
        onClose={() => { setEditModalOpen(false); setEditingTask(null) }}
        editingTask={editingTask}
        onSaved={onSaved}
      />
      <Toast open={toastOpen} message={toastMsg} variant={toastVar} onClose={() => setToastOpen(false)} />
    </div>
  )
}
