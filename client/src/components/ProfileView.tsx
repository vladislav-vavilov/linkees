import { FC } from 'react'

import { Role } from '@/types'

import { UserAvatar } from './User/UserAvatar'
import { Userinfo } from './User/Userinfo'

interface ProfileViewProps {
  username: string
  description?: string
  avatar: string | null
  role: Role
}

export const ProfileView: FC<ProfileViewProps> = ({
  username,
  description,
  avatar,
  role
}) => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <UserAvatar avatar={avatar} username={username} />
      <Userinfo username={username} role={role} className='items-center' />
      {description && (
        <span className='text-center leading-none text-gray-600'>
          {description}
        </span>
      )}
    </div>
  )
}
