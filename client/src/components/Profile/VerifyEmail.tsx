import { FC } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/hooks/redux'
import { getApiErrorMessage } from '@/lib/utils'
import { useSendVerificationEmailMutation } from '@/services/accountService'
import { selectCurrentUser } from '@/store/slices/userSlice'

export const VerifyEmail: FC = () => {
  const { verified } = useAppSelector(selectCurrentUser)
  const [sendEmail, { isLoading }] = useSendVerificationEmailMutation()

  const handleClick = async () => {
    const { data, error } = await sendEmail()
    data && toast.success('Verification email sent')
    error && toast.error(getApiErrorMessage(error))
  }

  if (verified) return

  return (
    <Button
      onClick={handleClick}
      variant='outline'
      size='sm'
      disabled={isLoading}
    >
      Verify your email
    </Button>
  )
}
