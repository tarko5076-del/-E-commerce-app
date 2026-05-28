import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { orderService } from '../../services/orderService'

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () =>
  orderService.list(),
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default ordersSlice.reducer
