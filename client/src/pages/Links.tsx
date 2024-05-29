import { FC } from 'react'

import { Heading } from '@/components/Heading'
import { LinkCards } from '@/components/Links/LinkCards'
import { LinksAddNew } from '@/components/Links/LinksAddNew'

export const Links: FC = () => {
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
      <LinkCards />
    </div>
  )
}
