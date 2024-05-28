import { Middleware } from '@reduxjs/toolkit'

import { RootState } from '@/store'

export const authMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const token = (getState() as RootState).user.token
    const isChanged = !(token === localStorage.getItem('token'))

    if (token && isChanged) localStorage.setItem('token', token)
    if (!token && isChanged) localStorage.removeItem('token')

    next(action)
  }
