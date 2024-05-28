import { ArrowRight } from 'lucide-react'
import { ComponentType, FC, ReactNode } from 'react'

import { type Icon } from '@/types'

interface LinkItemProps {
  children: ReactNode
  URI: string
  icon: ComponentType<Icon>
  color: string
}

export const LinkItem: FC<LinkItemProps> = ({
  children,
  URI,
  icon: Icon,
  color
}) => {
  return (
    <a
      href={URI}
      target='_blank'
      className='flex items-center justify-between gap-4 rounded-lg px-4 py-2.5 text-white transition-all hover:shadow-lg'
      style={{ background: color }}
    >
      <div className='flex items-center gap-2'>
        <Icon />
        <span className='text-sm'>{children}</span>
      </div>
      <ArrowRight size={20} />
    </a>
  )
}
