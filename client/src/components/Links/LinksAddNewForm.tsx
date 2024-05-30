import { FC } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

import { getApiErrorMessage } from '@/lib/utils'
import { useCreateLinkMutation } from '@/services/linksService'

import { formSchema, LinksForm } from './LinksForm'

export const LinksAddNewForm: FC = () => {
  const [createLink, { isLoading }] = useCreateLinkMutation()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { data, error } = await createLink(values)
    data && toast.success(data.message)
    error && toast.error(getApiErrorMessage(error))
  }

  return <LinksForm onSubmit={onSubmit} isLoading={isLoading} />
}
