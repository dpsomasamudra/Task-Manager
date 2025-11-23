import React from 'react'

export default function TaskFilters({ status, setStatus, priority, setPriority, search, setSearch }) {
  return (
    <div className="card tm-card mb-3">
      <div className="card-body">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label">Status</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-check2-circle"></i></span>
              <select className="form-select tm-select" value={status} onChange={e => setStatus(e.target.value)}>
                <option>All</option>
                <option>Completed</option>
                <option>Incomplete</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Priority</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-flag"></i></span>
              <select className="form-select tm-select" value={priority} onChange={e => setPriority(e.target.value)}>
                <option>All</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Search by title</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-search"></i></span>
              <input className="form-control tm-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
