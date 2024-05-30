import { LogOutIcon } from 'lucide-react'
import { FC, useState } from 'react'

import { DrawerDialog } from '@/components/DrawerDialog'
import { Heading } from '@/components/Heading'
import { ProfileAccount } from '@/components/Profile/ProfileAccount'
import { ProfileAvatar } from '@/components/Profile/ProfileAvatar'
import { ProfileFields } from '@/components/Profile/ProfileFields'
import { ProfileForm } from '@/components/Profile/ProfileForm'
import { ProfileUpdatePassword } from '@/components/Profile/ProfileUpdatePassword'
import { VerifyEmail } from '@/components/Profile/VerifyEmail'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Userinfo } from '@/components/Userinfo'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { logout, selectCurrentUser } from '@/store/slices/userSlice'

export const Profile: FC = () => {
  const { username, role, color } = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col gap-8'>
      <Heading title='Profile details' />
      <div
        className='flex flex-col gap-2 rounded-md p-4 shadow-md backdrop-blur-lg'
        style={{
          background: `linear-gradient(180deg, ${color}, rgb(249 250 251) 45%)`
        }}
      >
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <ProfileAvatar />
            <Userinfo username={username} role={role} />
            <button onClick={() => dispatch(logout())}>
              <LogOutIcon />
            </button>
          </div>
          <div className='flex items-center gap-2'>
            <VerifyEmail />
            <DrawerDialog
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              title='Edit profile'
              description="Don't forget to save the changes."
              trigger={<Button>Edit profile</Button>}
            >
              <ProfileForm />
            </DrawerDialog>
          </div>
        </div>
        <ProfileFields handleOpen={() => setIsOpen(true)} />
      </div>
      <Separator />
      <ProfileUpdatePassword />
      <ProfileAccount />
    </div>
  )
}
