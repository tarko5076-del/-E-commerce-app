import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('kg_user') || 'null'),
    accessToken: localStorage.getItem('kg_access_token'),
  },
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      localStorage.setItem('kg_user', JSON.stringify(action.payload.user))
      localStorage.setItem('kg_access_token', action.payload.accessToken)
    },
    logout(state) {
      state.user = null
      state.accessToken = null
      localStorage.removeItem('kg_user')
      localStorage.removeItem('kg_access_token')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
