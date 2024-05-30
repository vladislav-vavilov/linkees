import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { platforms } from '@/constants'
import { cn } from '@/lib/utils'
import { useLinksQuery } from '@/services/api'

import { LinksFetchingError } from '../Links/LinksFetchingError'
import { LinkItem } from './LinkItem'
import { LinkItemsSkeleton } from './LinkItemsSkeleton'

export const LinkItems: FC<{ className?: string }> = ({ className }) => {
  const { userId } = useParams()
  const { data, isLoading, isError, refetch, isFetching } =
    useLinksQuery(userId)

  if (isLoading) return <LinkItemsSkeleton />
  if (isError)
    return <LinksFetchingError isFetching={isFetching} refetch={refetch} />

  const items = data?.map(({ platform, URI, id }) => ({
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
