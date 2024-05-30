import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from '@/constants'
import { RootState } from '@/store'
import { type User } from '@/types'
import {
  BaseResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest
} from '@/types/api'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).user.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['User', 'Links'],
  endpoints: (builder) => ({
    register: builder.mutation<BaseResponse, RegisterRequest>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data
      })
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data
      })
    }),
    auth: builder.query<User, string | null | void>({
      query: () => '/auth/auth',
      providesTags: ['User', 'Links']
    })
  })
})

export const { useRegisterMutation, useLoginMutation, useAuthQuery } = api
