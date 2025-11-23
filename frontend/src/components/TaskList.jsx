import React from 'react'

export default function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="card tm-card animate__animated animate__fadeInUp">
      <div className="card-body">
        {tasks.length === 0 ? (
          <div className="text-muted">No tasks yet. Create your first task!</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover tm-table align-middle">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Deadline</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(t => {
                  const overdue = t.deadline && new Date(t.deadline) < new Date() && t.status === 'Incomplete'
                  return (
                    <tr key={t._id} className="animate__animated animate__fadeInUp">
                      <td className="fw-semibold">{t.title}</td>
                      <td className="tm-desc" title={t.description}>{t.description}</td>
                      <td>{t.deadline ? `Due: ${new Date(t.deadline).toLocaleDateString()}` : '-'}</td>
                      <td>
                        <span className={`badge ${t.priority === 'High' ? 'bg-danger' : t.priority === 'Medium' ? 'bg-primary' : 'bg-secondary'}`}>{t.priority}</span>
                      </td>
                      <td>
                        <span className={`badge ${t.status === 'Completed' ? 'bg-success' : 'bg-warning text-dark'}`}>{t.status}</span>
                        {overdue && <span className="badge tm-badge-overdue ms-2">Overdue</span>}
                      </td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-secondary me-2" aria-label="Edit" onClick={() => onEdit(t)}>
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" aria-label="Delete" onClick={() => onDelete(t)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
