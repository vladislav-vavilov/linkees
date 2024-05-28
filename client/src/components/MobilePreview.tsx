import { FC } from 'react'

import { useAppSelector } from '@/hooks/redux'
import { selectUser } from '@/store/slices/userSlice'

import { LinkItems } from './LinkItems'
import { OutlinePhone } from './OutlinePhone'
import { ProfileView } from './ProfileView'

export const MobilePreview: FC = () => {
  const { color } = useAppSelector(selectUser)

  return (
    <OutlinePhone
      className='relative flex h-full flex-col gap-8 pt-12'
      style={{
        background: `linear-gradient(180deg, ${color}, transparent 45%)`
      }}
    >
      <ProfileView />
      <LinkItems />
    </OutlinePhone>
  )
}
