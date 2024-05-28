import { FC, useState } from 'react'

import { Button } from '@/components/ui/button'

import { DrawerDialog } from '../DrawerDialog'
import { PasswordForm } from './PasswordForm'
import { ProfileSection } from './ProfileSection'

export const ProfileUpdatePassword: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ProfileSection
      title='Password'
      description='Change your current password to a new one.'
    >
      <DrawerDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title='Update your password'
        description='Enter your current password and a new password'
        trigger={<Button variant='secondary'>Update password</Button>}
      >
        <PasswordForm handleClose={() => setIsOpen(false)} />
      </DrawerDialog>
    </ProfileSection>
  )
}
