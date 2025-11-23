import React, { useState } from 'react'
import { login as apiLogin, signup as apiSignup } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (mode === 'login') {
        const data = await apiLogin(email, password)
        login(data.token, email)
      } else {
        const data = await apiSignup(email, password)
        login(data.token, email)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <div className="text-center mb-3"><i className="bi bi-check2-square" style={{ fontSize: '2rem', color: 'var(--tm-primary)' }}></i></div>
      <div className="card tm-card animate__animated animate__fadeIn">
        <div className="card-body">
          <div className="d-flex justify-content-center mb-3">
            <div className="btn-group" role="group">
              <button className={`btn ${mode === 'login' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setMode('login')}>Login</button>
              <button className={`btn ${mode === 'signup' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setMode('signup')}>Sign Up</button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                <input type="email" className="form-control tm-input" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock"></i></span>
                <input type="password" className="form-control tm-input" value={password} onChange={e => setPassword(e.target.value)} minLength={6} required />
              </div>
            </div>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
