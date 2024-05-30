import { useAppSelector } from '@/hooks/redux'
import { selectCurrentUser } from '@/store/slices/userSlice'

import { UserAvatar } from '../UserAvatar'
import { ProfileAvatarDropdownMenu } from './ProfileAvatarDropdownMenu'

export const ProfileAvatar = () => {
  const { username, avatar } = useAppSelector(selectCurrentUser)

  return (
    <div className='group relative -m-4 p-4'>
      <ProfileAvatarDropdownMenu />
      <UserAvatar avatar={avatar} username={username} />
    </div>
  )
}
