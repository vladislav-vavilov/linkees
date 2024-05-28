import { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { API_URL } from '@/constants'
import { useAppSelector } from '@/hooks/redux'
import { cn } from '@/lib/utils'
import { selectUser } from '@/store/slices/userSlice'

import { Userinfo } from './Userinfo'

interface ProfileViewProps {
  size?: 'base' | 'lg'
}

export const ProfileView: FC<ProfileViewProps> = ({ size = 'base' }) => {
  const { username, description, avatar } = useAppSelector(selectUser)

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
      <Userinfo className='items-center' />
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
