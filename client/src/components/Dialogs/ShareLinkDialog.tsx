import { Copy } from 'lucide-react'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
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
import { Input } from '@/components/ui/input'
import { useAppSelector } from '@/hooks/redux'
import { selectCurrentUser } from '@/store/slices/userSlice'

interface ShareLinkDialogProps {
  link?: string
}

export const ShareLinkDialog: FC<ShareLinkDialogProps> = ({ link }) => {
  const { userId } = useParams()
  const { id } = useAppSelector(selectCurrentUser)
  const URI = link ?? window.location.origin + '/' + (userId ?? id)

  const copy = () => {
    navigator.clipboard.writeText(URI)
    toast.success('Link has been copied to clipboard')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Share Link</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Share Link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view your profile links.
          </DialogDescription>
        </DialogHeader>
        <div className='flex w-full items-center gap-2'>
          <Input id='link' defaultValue={URI} readOnly className='flex-auto' />
          <DialogClose asChild className='px-3'>
            <Button onClick={copy} size='sm'>
              <span className='sr-only'>Copy</span>
              <Copy size={16} />
            </Button>
          </DialogClose>
        </div>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
