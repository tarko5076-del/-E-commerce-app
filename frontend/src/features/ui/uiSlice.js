import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  language: localStorage.getItem('kg_language') || 'en',
  lowDataMode: localStorage.getItem('kg_low_data') === 'true',
  cartOpen: false,
  toast: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload
      localStorage.setItem('kg_language', action.payload)
    },
    toggleLowDataMode(state) {
      state.lowDataMode = !state.lowDataMode
      localStorage.setItem('kg_low_data', String(state.lowDataMode))
    },
    openCart(state) {
      state.cartOpen = true
    },
    closeCart(state) {
      state.cartOpen = false
    },
    showToast(state, action) {
      state.toast = action.payload
    },
    clearToast(state) {
      state.toast = null
    },
  },
})

export const {
  setLanguage,
  toggleLowDataMode,
  openCart,
  closeCart,
  showToast,
  clearToast,
} = uiSlice.actions
export default uiSlice.reducer
