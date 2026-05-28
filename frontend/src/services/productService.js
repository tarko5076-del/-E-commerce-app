import { apiClient } from './apiClient'

export const productService = {
  async list(params = {}) {
    const response = await apiClient.get('/api/products', { params })
    return response.data
  },
  async featured() {
    const response = await apiClient.get('/api/products/featured')
    return response.data
  },
  async getById(id) {
    const response = await apiClient.get(`/api/products/${id}`)
    return response.data
  },
  async search(q) {
    const response = await apiClient.get('/api/products/search', {
      params: { q },
    })
    return response.data
  },
  async create(payload) {
    const response = await apiClient.post('/api/products', payload)
    return response.data
  },
  async update(id, payload) {
    const response = await apiClient.put(`/api/products/${id}`, payload)
    return response.data
  },
  async remove(id) {
    await apiClient.delete(`/api/products/${id}`)
  },
}
