import { apiClient } from './apiClient'

export const authService = {
  async register(payload) {
    const response = await apiClient.post('/api/auth/register', payload)
    return response.data
  },
  async login(payload) {
    const response = await apiClient.post('/api/auth/login', payload)
    return response.data
  },
  async me() {
    const response = await apiClient.get('/api/auth/me')
    return response.data
  },
  async google(payload) {
    const response = await apiClient.post('/api/auth/google', payload)
    return response.data
  },
}
