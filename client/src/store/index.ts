import { configureStore } from '@reduxjs/toolkit'

import { api } from '@/services/api'
import { authMiddleware } from '@/store/middlewares/authMiddleware'
import linksReducer from '@/store/slices/linksSlice'
import userReducer from '@/store/slices/userSlice'

export const store = configureStore({
  reducer: {
    links: linksReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, authMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
