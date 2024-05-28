import { FC } from 'react'

import { Badge } from '@/components/ui/badge'
import { roles } from '@/constants'
import { useAppSelector } from '@/hooks/redux'
import { cn } from '@/lib/utils'
import { selectUser } from '@/store/slices/userSlice'

interface UserinfoProps {
  className?: string
}

export const Userinfo: FC<UserinfoProps> = ({ className }) => {
  const { username, role } = useAppSelector(selectUser)
  const Icon = roles[role].icon

  return (
    <div className={cn('flex flex-col items-start', className)}>
      <div className='flex items-center gap-1'>
        <Icon />
        <span className='max-w-[200px] truncate text-2xl font-medium'>
          {username}
        </span>
      </div>
      <Badge>{roles[role].label}</Badge>
    </div>
  )
}
