import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { roles } from '@/constants'
import { cn } from '@/lib/utils'
import { useUserQuery } from '@/services/api'

interface UserinfoProps {
  className?: string
}

export const Userinfo: FC<UserinfoProps> = ({ className }) => {
  const { userId } = useParams()
  const { data } = useUserQuery(userId)

  if (!data) return

  const Icon = roles[data.role].icon

  return (
    <div className={cn('flex flex-col items-start', className)}>
      <div className='flex items-center gap-1'>
        <Icon />
        <span className='max-w-[200px] truncate text-2xl font-medium'>
          {data.username}
        </span>
      </div>
      <Badge>{roles[data.role].label}</Badge>
    </div>
  )
}
