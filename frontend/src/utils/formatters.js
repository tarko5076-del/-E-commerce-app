// Currency, phone, and search helpers are shared by pages and components.
export function formatETB(value, language = 'en') {
  const amount = new Intl.NumberFormat('en-ET', {
    maximumFractionDigits: 0,
  }).format(Number(value || 0))

  return language === 'am' ? `ብር ${amount}` : `ETB ${amount}`
}

export function isEthiopianPhone(phone) {
  return /^\+2519\d{8}$/.test(phone.replace(/\s/g, ''))
}

export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function normalizeText(value) {
  return String(value || '').trim().toLowerCase()
}
