import { FC } from 'react'

import { cn } from '@/lib/utils'
import { Role } from '@/types'

import { UserAvatar } from './UserAvatar'
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
      <UserAvatar avatar={avatar} username={username} />
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
