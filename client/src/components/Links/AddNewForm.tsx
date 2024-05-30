import { FC } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

import { getApiError } from '@/lib/utils'
import { useCreateLinkMutation } from '@/services/linksService'

import { formSchema, LinkForm } from './LinkForm'

export const AddNewForm: FC = () => {
  const [createLink, { isLoading }] = useCreateLinkMutation()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { data, error } = await createLink(values)
    data && toast.success(data.message)
    error && toast.error(getApiError(error))
  }

  return <LinkForm onSubmit={onSubmit} isLoading={isLoading} />
}
