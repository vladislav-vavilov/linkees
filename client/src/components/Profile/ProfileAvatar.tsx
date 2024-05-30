import { useAppSelector } from '@/hooks/redux'
import { selectCurrentUser } from '@/store/slices/userSlice'

import { UserAvatar } from '../UserAvatar'
import { ProfileAvatarDropdownMenu } from './ProfileAvatarDropdownMenu'

export const ProfileAvatar = () => {
  const { username, avatar } = useAppSelector(selectCurrentUser)

  return (
    <div className='group relative -m-2 p-2 sm:-m-4 sm:p-4'>
      <ProfileAvatarDropdownMenu />
      <UserAvatar avatar={avatar} username={username} />
    </div>
  )
}
