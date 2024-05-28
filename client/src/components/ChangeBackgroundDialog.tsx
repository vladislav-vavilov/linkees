import { Edit2 } from 'lucide-react'
import { FC, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { colors } from '@/constants'
import { useAppSelector } from '@/hooks/redux'
import { cn, getApiErrorMessage } from '@/lib/utils'
import { useUpdateProfileMutation } from '@/services/api'
import { selectUser } from '@/store/slices/userSlice'

export const ChangeBackgroundDialog: FC = () => {
  const { color } = useAppSelector(selectUser)
  const [selectedValue, setSelectedValue] = useState(color)
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const save = async () => {
    const { data, error } = await updateProfile({ color: selectedValue })
    data && toast.success('The changes have been saved')
    error && toast.error(getApiErrorMessage(error))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' className='flex gap-1'>
          <Edit2 size={16} />
          <span>Background</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change background</DialogTitle>
          <DialogDescription>
            Paste a background image url here.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-wrap gap-2'>
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => setSelectedValue(color)}
              className={cn('h-14 w-14 cursor-pointer rounded-full', {
                'outline-dashed outline-2 outline-black':
                  color === selectedValue
              })}
              style={{ background: color }}
            />
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => setSelectedValue(color)} variant='secondary'>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={save}
            disabled={isLoading || color === selectedValue}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
