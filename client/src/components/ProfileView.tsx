import { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { API_URL } from '@/constants'
import { cn } from '@/lib/utils'
import { Role } from '@/types'

import { Userinfo } from './Userinfo'

interface ProfileViewProps {
  size?: 'base' | 'lg'
  data: {
    username: string
    description?: string
    avatar: string | null
    role: Role
  }
}

export const ProfileView: FC<ProfileViewProps> = ({ size = 'base', data }) => {
  const { username, description, avatar } = data

  return (
    <div className='flex flex-col items-center gap-2'>
      <Avatar
        className={cn({
          'h-24 w-24': size === 'base',
          'h-32 w-32': size === 'lg'
        })}
      >
        {avatar && <AvatarImage src={API_URL + '/' + avatar} alt={username} />}
        <AvatarFallback />
      </Avatar>
      <Userinfo data={data} className='items-center' />
      {description && (
        <span
          className={cn(
            { 'text-lg': size === 'lg' },
            'text-center leading-none text-gray-600'
          )}
        >
          {description}
        </span>
      )}
    </div>
  )
}
