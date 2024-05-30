import { FC } from 'react'

import { useAppSelector } from '@/hooks/redux'
import { selectLinks } from '@/store/slices/linksSlice'
import { selectCurrentUser } from '@/store/slices/userSlice'

import { LinkItems } from './LinkItems'
import { OutlinePhone } from './OutlinePhone'
import { ProfileView } from './ProfileView'

export const MobilePreview: FC = () => {
  const links = useAppSelector(selectLinks)
  const { username, description, avatar, role, color } =
    useAppSelector(selectCurrentUser)

  return (
    <OutlinePhone
      className='relative flex h-full flex-col gap-8 pt-12'
      style={{
        background: `linear-gradient(180deg, ${color}, transparent 45%)`
      }}
    >
      <ProfileView data={{ username, description, avatar, role }} />
      <LinkItems items={links} />
    </OutlinePhone>
  )
}
