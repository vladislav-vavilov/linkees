import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { api } from '@/services/api'
import { RootState } from '@/store'
import { type Link } from '@/types'
import { RequireAtLeastOne } from '@/types/utils'

const initialState: Link[] = []

export const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<RequireAtLeastOne<Link>>) => {
      const link = state.find(({ id }) => id === action.payload.id)
      if (link) Object.assign(link, action.payload)
    },
    reorder: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const [removed] = state.splice(action.payload.from, 1)
      state.splice(action.payload.to, 0, removed)
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.auth.matchFulfilled, (_, { payload }) => {
      return payload.links
    })
  }
})

export const { update, reorder } = linksSlice.actions
export default linksSlice.reducer

export const selectLinks = (state: RootState) => state.links
