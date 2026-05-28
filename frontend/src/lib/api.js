const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export async function api(path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(detail || 'Request failed')
  }

  if (response.status === 204) return null
  return response.json()
}
