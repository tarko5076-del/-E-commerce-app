import { apiClient } from './apiClient'

export const paymentService = {
  async initialize(method, payload) {
    const endpoints = {
      chapa: '/api/payments/chapa/initialize',
      telebirr: '/api/payments/telebirr/initialize',
      cbe: '/api/payments/cbe/initialize',
      amhara_bank: '/api/payments/amhara-bank/initialize',
      cod: '/api/payments/cod/confirm',
    }

    const response = await apiClient.post(endpoints[method], payload)
    return response.data
  },
}
