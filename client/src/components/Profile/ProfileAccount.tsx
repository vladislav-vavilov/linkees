import { FC } from 'react'

import { useAppDispatch } from '@/hooks/redux'
import { logout } from '@/store/slices/userSlice'

import { Button } from '../ui/button'
import { DeleteAccountDialog } from './DeleteAccountDialog'
import { ProfileSection } from './ProfileSection'

export const ProfileAccount: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <ProfileSection
      title='Account'
      description='Deleting your account is an action that cannot be undone. This will
        permanently delete your account and your data from our servers.'
    >
      <div className='flex items-center gap-2'>
        <Button
          onClick={() => dispatch(logout())}
          variant='secondary'
          className='flex items-center gap-1 self-start'
        >
          Log out
        </Button>
        <DeleteAccountDialog />
      </div>
    </ProfileSection>
  )
}
