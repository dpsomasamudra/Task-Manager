import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const t = localStorage.getItem('token')
    const e = localStorage.getItem('userEmail')
    if (t) setToken(t)
    if (e) setUserEmail(e)
  }, [])

  const login = (t, email) => {
    localStorage.setItem('token', t)
    localStorage.setItem('userEmail', email)
    setToken(t)
    setUserEmail(email)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    setToken(null)
    setUserEmail('')
  }

  return <AuthContext.Provider value={{ token, userEmail, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
