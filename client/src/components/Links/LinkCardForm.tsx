import { FC } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

import { useDebounce } from '@/hooks/useDebounce'
import { getApiErrorMessage } from '@/lib/utils'
import { useUpdateLinkMutation } from '@/services/linksService'
import { Link } from '@/types'
import { UpdateLinkRequest } from '@/types/api'

import { formSchema, LinkForm } from './LinkForm'

export const LinkCardForm: FC<Link> = ({ platform, URI, id }) => {
  const [updateLink, { isLoading }] = useUpdateLinkMutation()

  const debouncedUpdate = useDebounce(async (payload: UpdateLinkRequest) => {
    const { data, error } = await updateLink(payload)
    data && toast.success(data.message)
    error && toast.error(getApiErrorMessage(error))
  }, 1500)

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    debouncedUpdate({ ...values, id })
  }

  return (
    <LinkForm
      onSubmit={onSubmit}
      autoSubmit={true}
      isLoading={isLoading}
      defaultValues={{ platform, URI }}
    />
  )
}
