const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const request = async (path, options = {}) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const signup = (email, password) =>
  request('/auth/signup', { method: 'POST', body: JSON.stringify({ email, password }) })

export const login = (email, password) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })

export const logout = () => request('/auth/logout', { method: 'POST' })

export const getTasks = (params = {}) => {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '' && v !== 'All') searchParams.append(k, v)
  })
  const qs = searchParams.toString()
  return request(`/tasks${qs ? `?${qs}` : ''}`)
}

export const createTask = data => request('/tasks', { method: 'POST', body: JSON.stringify(data) })

export const updateTask = (id, data) => request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const deleteTask = id => request(`/tasks/${id}`, { method: 'DELETE' })
