import { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { API_URL } from '@/constants'
import { cn } from '@/lib/utils'

interface UserAvatarProps {
  avatar: string | null
  username: string
}

export const UserAvatar: FC<UserAvatarProps> = ({ avatar, username }) => {
  return (
    <Avatar className='h-28 w-28 select-none border-2 border-gray-100 shadow-sm'>
      <AvatarImage src={API_URL + '/' + avatar} className='object-cover' />
      <AvatarFallback
        className={cn(
          'bg-white text-3xl font-medium text-gray-600',
          !avatar && 'animate-none'
        )}
      >
        {username.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
