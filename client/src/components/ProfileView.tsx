import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { API_URL } from '@/constants'
import { cn } from '@/lib/utils'
import { useUserQuery } from '@/services/api'

import { Userinfo } from './Userinfo'

interface ProfileViewProps {
  size?: 'base' | 'lg'
}

export const ProfileView: FC<ProfileViewProps> = ({ size = 'base' }) => {
  const { userId } = useParams()
  const { data } = useUserQuery(userId)

  return (
    <div className='flex flex-col items-center gap-2'>
      <Avatar
        className={cn({
          'h-24 w-24': size === 'base',
          'h-32 w-32': size === 'lg'
        })}
      >
        {data?.avatar && (
          <AvatarImage
            src={API_URL + '/' + data?.avatar}
            alt={data?.username}
          />
        )}
        <AvatarFallback />
      </Avatar>
      <Userinfo className='items-center' />
      {data?.description && (
        <span
          className={cn(
            { 'text-lg': size === 'lg' },
            'text-center leading-none text-gray-600'
          )}
        >
          {data?.description}
        </span>
      )}
    </div>
  )
}
