import { Label } from '@radix-ui/react-label'
import { GripVertical } from 'lucide-react'
import { FC, memo } from 'react'
import { toast } from 'sonner'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { platforms } from '@/constants'
import { useAppDispatch } from '@/hooks/redux'
import { useDebounce } from '@/hooks/useDebounce'
import { getApiErrorMessage } from '@/lib/utils'
import { useDeleteLinkMutation, useUpdateLinkMutation } from '@/services/api'
import { update } from '@/store/slices/linksSlice'
import { type Link as LinkCardProps } from '@/types'
import { UpdateLinkRequest } from '@/types/api'

import { PlatformSelect } from '../PlatformSelect/PlatformSelect'

export const LinkCard: FC<LinkCardProps> = memo(({ platform, URI, id }) => {
  const dispatch = useAppDispatch()
  const linkPlaceholder = platforms[platform]?.domain

  const [updateLink] = useUpdateLinkMutation()
  const [deleteLink, { isLoading: isDeleteLoading }] = useDeleteLinkMutation()

  const debouncedUpdate = useDebounce(async (payload) => {
    const { data, error } = await updateLink(payload)
    data && toast.success(data.message)
    error && toast.error(getApiErrorMessage(error))
  }, 1500)

  const handleUpdate = (payload: UpdateLinkRequest) => {
    dispatch(update(payload))
    debouncedUpdate(payload)
  }

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
        <div>
          <Label>Platform</Label>
          <PlatformSelect
            value={platform}
            onChange={(e) => handleUpdate({ id, platform: e })}
          />
        </div>
        <div>
          <Label>URI</Label>
          <Input
            value={URI}
            onChange={(e) => handleUpdate({ id, URI: e.target.value })}
            placeholder={linkPlaceholder}
          />
        </div>
      </CardContent>
    </Card>
  )
})
