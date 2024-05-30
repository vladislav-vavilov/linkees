import { GripVertical } from 'lucide-react'
import { FC } from 'react'
import { toast } from 'sonner'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getApiErrorMessage } from '@/lib/utils'
import { useDeleteLinkMutation } from '@/services/linksService'
import { type Link as LinkCardProps } from '@/types'

import { LinkCardForm } from './LinkCardForm'

export const LinkCard: FC<LinkCardProps> = ({ platform, URI, id }) => {
  const [deleteLink, { isLoading: isDeleteLoading }] = useDeleteLinkMutation()

  const handleRemove = async () => {
    const { data, error } = await deleteLink(id)
    data && toast.success(data.message)
    error && toast.error(getApiErrorMessage(error))
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between p-4'>
        <div className='flex items-center'>
          <button type='button'>
            <GripVertical size={16} />
          </button>
          <CardTitle className='text-md font-bold'>{platform}</CardTitle>
        </div>
        <button
          type='button'
          onClick={handleRemove}
          disabled={isDeleteLoading}
          className='text-gray-400 transition-colors hover:text-gray-600'
        >
          Remove
        </button>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <LinkCardForm platform={platform} URI={URI} id={id} />
      </CardContent>
    </Card>
  )
}
