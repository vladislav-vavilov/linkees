import { Link } from '@/types'
import {
  BaseResponse,
  ReorderLinksRequest,
  UpdateLinkRequest
} from '@/types/api'

import { api } from './api'

const linksApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
  useCreateLinkMutation,
  useUpdateLinkMutation,
  useReorderLinksMutation,
  useDeleteLinkMutation
} = linksApi
