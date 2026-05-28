import { apiClient } from './apiClient'

export const orderService = {
  async list() {
    const response = await apiClient.get('/api/orders')
    return response.data
  },
  async create(payload) {
    const response = await apiClient.post('/api/orders', payload)
    return response.data
  },
  async cancel(id) {
    const response = await apiClient.put(`/api/orders/${id}/cancel`)
    return response.data
  },
}
