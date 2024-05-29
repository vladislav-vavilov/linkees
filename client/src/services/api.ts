import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from '@/constants'
import { RootState } from '@/store'
import { Link, type User } from '@/types'
import {
  BaseResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ReorderLinksRequest,
  UpdateLinkRequest,
  UpdatePasswordRequest,
  UpdateProfileRequest
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
      providesTags: ['User']
    }),
    user: builder.query({
      query: (id) => ({
        url: `/account/${id}`
      }),
      providesTags: ['User']
    }),
    uploadAvatar: builder.mutation<BaseResponse, File>({
      query: (file) => {
        const formData = new FormData()
        formData.append('avatar', file)

        return {
          url: '/account/avatar',
          method: 'POST',
          body: formData
        }
      },
      invalidatesTags: ['User']
    }),
    deleteAvatar: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: '/account/avatar',
        method: 'DELETE'
      }),
      invalidatesTags: ['User']
    }),
    updateProfile: builder.mutation<BaseResponse, UpdateProfileRequest>({
      query: (data) => ({
        url: '/account',
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    deleteProfile: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: '/account',
        method: 'DELETE'
      }),
      invalidatesTags: ['User']
    }),
    updatePassword: builder.mutation<BaseResponse, UpdatePasswordRequest>({
      query: (data) => ({
        url: '/account/password',
        method: 'PUT',
        body: data
      })
    }),
    sendVerificationEmail: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: '/account/verify',
        method: 'POST'
      })
    }),
    links: builder.query<Link[], string | void>({
      query: (id) => `/links/${id ?? ''}`,
      providesTags: ['Links']
    }),
    createLink: builder.mutation<BaseResponse, Omit<Link, 'id'>>({
      query: (data) => ({
        url: '/links',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Links']
    }),
    updateLink: builder.mutation<BaseResponse, UpdateLinkRequest>({
      query: ({ URI, platform, id }) => ({
        url: `/links/${id}`,
        method: 'PATCH',
        body: { URI, platform }
      }),
      invalidatesTags: ['Links']
    }),
    reorderLinks: builder.mutation<BaseResponse, ReorderLinksRequest>({
      query: (data) => ({
        url: `/links/${data.id}/reorder`,
        method: 'PUT',
        body: data
      })
    }),
    deleteLink: builder.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `/links/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Links']
    })
  })
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useAuthQuery,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useUpdatePasswordMutation,
  useSendVerificationEmailMutation,
  useLinksQuery,
  useCreateLinkMutation,
  useUpdateLinkMutation,
  useReorderLinksMutation,
  useDeleteLinkMutation
} = api
