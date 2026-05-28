import { createSlice } from '@reduxjs/toolkit'

const savedCart = JSON.parse(localStorage.getItem('kg_cart') || '[]')

function persist(items) {
  localStorage.setItem('kg_cart', JSON.stringify(items))
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: savedCart,
    couponCode: '',
    discount: 0,
  },
  reducers: {
    addItem(state, action) {
      const product = action.payload
      const current = state.items.find((item) => item.id === product.id)
      if (current) {
        current.qty = Math.min(current.qty + 1, product.totalStock || product.stock)
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          nameAmharic: product.nameAmharic,
          price: product.price,
          image: product.images?.[0],
          qty: 1,
          stock: product.totalStock || product.stock,
        })
      }
      persist(state.items)
    },
    updateQty(state, action) {
      const { id, qty } = action.payload
      state.items = state.items
        .map((item) => (item.id === id ? { ...item, qty } : item))
        .filter((item) => item.qty > 0)
      persist(state.items)
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
      persist(state.items)
    },
    clearCart(state) {
      state.items = []
      state.couponCode = ''
      state.discount = 0
      persist(state.items)
    },
    applyCoupon(state, action) {
      state.couponCode = action.payload.code
      state.discount = action.payload.discount
    },
  },
})

export const { addItem, updateQty, removeItem, clearCart, applyCoupon } =
  cartSlice.actions

export const selectCartTotals = (state) => {
  const subtotal = state.cart.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  )
  const discount = state.cart.discount
  const deliveryCost = subtotal >= 15000 || subtotal === 0 ? 0 : 150
  const total = Math.max(subtotal - discount + deliveryCost, 0)
  const count = state.cart.items.reduce((sum, item) => sum + item.qty, 0)

  return { subtotal, discount, deliveryCost, total, count }
}

export default cartSlice.reducer
