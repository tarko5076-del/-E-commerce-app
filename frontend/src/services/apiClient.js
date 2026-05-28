import axios from 'axios'

// Axios client attaches JWT access tokens and keeps API calls in one place.
export const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    import.meta.env.REACT_APP_API_URL ||
    'http://localhost:8000',
  timeout: 15000,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('kg_access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
