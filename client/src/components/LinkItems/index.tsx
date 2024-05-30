import { FC } from 'react'

import { platforms } from '@/constants'
import { cn } from '@/lib/utils'
import { Link } from '@/types'

import { LinkItem } from './LinkItem'

interface LinkItemsProps {
  items: Link[]
  className?: string
}

export const LinkItems: FC<LinkItemsProps> = ({ items, className }) => {
  const links = items.map(({ platform, URI, id }) => ({
    id,
    URI,
    label: platforms[platform].label,
    icon: platforms[platform].icon.solid,
    color: platforms[platform].color
  }))

  return (
    <ul className={cn('flex flex-col gap-4', className)}>
      {links.map(({ URI, label, icon, color, id }) => (
        <li key={id}>
          <LinkItem URI={URI} icon={icon} color={color}>
            {label}
          </LinkItem>
        </li>
      ))}
    </ul>
  )
}
