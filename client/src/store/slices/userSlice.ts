import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { api } from '@/services/api'
import { RootState } from '@/store'
import { type User } from '@/types'
import { type LoginResponse } from '@/types/api'

interface StateValue {
  token: string | null
  data: User
}

const initialState: StateValue = {
  token: localStorage.getItem('token'),
  data: {} as User
}

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }: PayloadAction<LoginResponse>) => {
        state.token = payload.token
      }
    ),
      builder.addMatcher(
        api.endpoints.auth.matchFulfilled,
        (state, { payload }: PayloadAction<User>) => {
          state.data = payload
        }
      ),
      builder.addMatcher(
        api.endpoints.deleteProfile.matchFulfilled,
        (state) => {
          state.token = null
        }
      )
  }
})

export const { logout } = userSlice.actions
export default userSlice.reducer

export const selectCurrentUser = (state: RootState) => state.user.data
