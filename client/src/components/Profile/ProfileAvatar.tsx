import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { API_URL } from '@/constants'
import { useAppSelector } from '@/hooks/redux'
import { cn } from '@/lib/utils'
import { selectUser } from '@/store/slices/userSlice'

import { ProfileAvatarDropdownMenu } from './ProfileAvatarDropdownMenu'

export const ProfileAvatar = () => {
  const { username, avatar } = useAppSelector(selectUser)

  return (
    <div className='group relative -m-4 p-4'>
      <div className='h-28 w-28 rounded-full border-2 border-gray-100'>
        <ProfileAvatarDropdownMenu />
        <Avatar className='h-full w-full select-none'>
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
      </div>
    </div>
  )
}
