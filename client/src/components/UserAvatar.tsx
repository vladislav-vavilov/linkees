import { FC } from 'react'

import { API_URL } from '@/constants'
import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface UserAvatarProps {
  avatar: string | null
  username: string
}

export const UserAvatar: FC<UserAvatarProps> = ({ avatar, username }) => {
  return (
    <Avatar className='h-28 w-28 select-none border-2 border-gray-100 shadow-sm'>
      <AvatarImage src={API_URL + '/' + avatar} />
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
