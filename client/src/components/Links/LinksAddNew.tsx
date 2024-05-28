import { Plus } from 'lucide-react'
import { FC } from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { AddNewForm } from './AddNewForm'

export const LinksAddNew: FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          <Plus />
          <span>Add new link</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-96'>
        <h4 className='text-md font-bold'>Add new link</h4>
        <AddNewForm />
      </PopoverContent>
    </Popover>
  )
}
