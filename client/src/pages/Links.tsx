import { FC } from 'react'

import { Heading } from '@/components/Heading'
import { DragDropLinks } from '@/components/Links/DragDropLinks'
import { LinksAddNew } from '@/components/Links/LinksAddNew'
import { useAppSelector } from '@/hooks/redux'
import { selectLinks } from '@/store/slices/linksSlice'

export const Links: FC = () => {
  const linksAmount = useAppSelector(selectLinks).length

  return (
    <div className='flex h-full flex-col'>
      <div className='flex flex-col pb-2'>
        <Heading
          title='Customize your links'
          description='Add/edit/remove links below and then share all your profiles with the
          world!'
        />
        <LinksAddNew />
      </div>
      {linksAmount > 0 && <DragDropLinks />}
      {linksAmount === 0 && (
        <span className='text-lg font-medium'>There's no links yet.</span>
      )}
    </div>
  )
}
