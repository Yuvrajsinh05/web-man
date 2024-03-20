import { configureStore } from '@reduxjs/toolkit'
import requestSlice from './requestSlice'

export const store = configureStore({
  reducer: {
    request: requestSlice,
  },
})



