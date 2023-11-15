import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slice/productsSlice'
import modalsReducer from './slice/modalsSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    modals: modalsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})