import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

import { LinkItems } from '@/components/LinkItems'
import { ProfileView } from '@/components/ProfileView'
import { Section } from '@/components/Section'
import { ShareLinkDialog } from '@/components/ShareLinkDialog'
import { Spinner } from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { useAuthQuery, useUserQuery } from '@/services/api'

export const User: FC = () => {
  const { userId } = useParams()
  const { data, isLoading: isUserLoading } = useUserQuery(userId)
  const { data: currentUser, isLoading: isAuthLoading } = useAuthQuery()

  if (isUserLoading || isAuthLoading) return <Spinner.Centered />

  return (
    <div
      className='flex flex-col p-4'
      style={{
        background: `linear-gradient(180deg, ${data?.color}, transparent 60%)`
      }}
    >
      {userId === currentUser?.id && (
        <Section as='header' className='flex justify-between p-4'>
          <Button asChild variant='outline'>
            <Link to='/links'>Back to Editor</Link>
          </Button>
          <ShareLinkDialog link='https://google.com' />
        </Section>
      )}
      <Section className='mx-auto flex w-full max-w-80 flex-col gap-8 overflow-y-auto bg-transparent shadow-none md:mt-32 md:bg-white md:shadow-md'>
        <ProfileView size='lg' />
        <LinkItems className='overflow-y-auto md:max-h-80' />
      </Section>
    </div>
  )
}
