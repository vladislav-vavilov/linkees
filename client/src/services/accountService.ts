import { User } from '@/types'
import {
  BaseResponse,
  UpdatePasswordRequest,
  UpdateProfileRequest
} from '@/types/api'

import { api } from './api'

const accountApi = api.injectEndpoints({
  endpoints: (builder) => ({
    user: builder.query<User, string | void>({
      query: (id) => ({
        url: `/account/${id ?? ''}`
      }),
      providesTags: ['User', 'Links']
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
    })
  })
})

export const {
  useUserQuery,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useUpdatePasswordMutation,
  useSendVerificationEmailMutation
} = accountApi
