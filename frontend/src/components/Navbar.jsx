import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { token, userEmail, logout } = useAuth()
  return (
    <nav className="navbar navbar-light bg-light shadow-sm sticky-top">
      <div className="container">
        <a className="navbar-brand fw-semibold" href="#">Task Manager</a>
        {token && (
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-secondary">{userEmail}</span>
            <button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  )
}
