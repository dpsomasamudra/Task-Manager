import React, { useEffect, useState, useRef } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import LoginPage from './pages/LoginPage.jsx'
import TaskManager from './pages/TaskManager.jsx'
import Navbar from './components/Navbar.jsx'
import Toast from './components/Toast.jsx'

function AppInner() {
  const { token } = useAuth()
  const [open, setOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const wasLogged = useRef(false)
  useEffect(() => {
    setOpen(!token)
    if (token && !wasLogged.current) {
      setLoginOpen(true)
      wasLogged.current = true
    }
  }, [token])
  return (
    <>
      {token ? <TaskManager /> : <LoginPage />}
      {!token && <Toast open={open} message="User not logged in" variant="warning" onClose={() => setOpen(false)} />}
      {token && <Toast open={loginOpen} message="Logged in successfully" variant="success" onClose={() => setLoginOpen(false)} />}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AppInner />
    </AuthProvider>
  )
}
