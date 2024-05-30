import { Pen } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn, getApiErrorMessage } from '@/lib/utils'
import {
  useDeleteAvatarMutation,
  useUploadAvatarMutation
} from '@/services/accountService'

export const ProfileAvatarDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [uploadAvatar] = useUploadAvatarMutation()
  const [deleteAvatar] = useDeleteAvatarMutation()

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const { data, error } = await uploadAvatar(file)
      data && toast.success(data.message)
      error && toast.error(getApiErrorMessage(error))
    }
  }

  const handleDelete = async () => {
    const { data, error } = await deleteAvatar()
    data && toast.success(data.message)
    error && toast.error(getApiErrorMessage(error))
  }

  return (
    <>
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger className='absolute right-0 top-0 p-1 outline-none'>
          <div
            className={cn(
              'rounded-full bg-white p-1.5 shadow-md',
              !isOpen &&
                'cursor:invisible cursor:opacity-0 cursor:transition-all cursor:group-hover:visible cursor:group-hover:opacity-100'
            )}
          >
            <Pen size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <label
              htmlFor='upload-avatar'
              className='-mx-2 -my-1.5 flex-auto px-2 py-1.5'
            >
              Upload a photo
            </label>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            Remove a photo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        type='file'
        accept='image/*'
        id='upload-avatar'
        onChange={handleUpload}
        className='hidden'
      />
    </>
  )
}
