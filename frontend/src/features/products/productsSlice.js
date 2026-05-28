import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { productService } from '../../services/productService'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters = {}) => productService.list(filters),
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    selected: null,
    filters: {},
    status: 'idle',
    error: null,
    recentlyViewed: JSON.parse(localStorage.getItem('kg_recent') || '[]'),
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters(state) {
      state.filters = {}
    },
    addRecentlyViewed(state, action) {
      state.recentlyViewed = [
        action.payload,
        ...state.recentlyViewed.filter((item) => item.id !== action.payload.id),
      ].slice(0, 8)
      localStorage.setItem('kg_recent', JSON.stringify(state.recentlyViewed))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setFilters, clearFilters, addRecentlyViewed } =
  productsSlice.actions
export default productsSlice.reducer
