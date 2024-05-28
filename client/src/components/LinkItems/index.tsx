import { FC } from 'react'

import { platforms } from '@/constants'
import { useAppSelector } from '@/hooks/redux'
import { cn } from '@/lib/utils'
import { selectLinks } from '@/store/slices/linksSlice'

import { LinkItem } from './LinkItem'

export const LinkItems: FC<{ className?: string }> = ({ className }) => {
  const links = useAppSelector(selectLinks)

  const items = links.map(({ platform, URI, id }) => ({
    id,
    URI,
    label: platforms[platform].label,
    icon: platforms[platform].icon.solid,
    color: platforms[platform].color
  }))

  return (
    <ul className={cn('flex flex-col gap-4', className)}>
      {items?.map(({ URI, label, icon, color, id }) => (
        <li key={id}>
          <LinkItem URI={URI} icon={icon} color={color}>
            {label}
          </LinkItem>
        </li>
      ))}
    </ul>
  )
}
