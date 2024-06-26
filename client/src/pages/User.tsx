import { FC } from 'react'
import { useParams } from 'react-router-dom'

import NotFoundImage from '@/assets/not-found.png'
import { LinkItems } from '@/components/LinkItems'
import { ProfileView } from '@/components/ProfileView'
import { Section } from '@/components/Section'
import { Spinner } from '@/components/Spinner'
import { UserHeader } from '@/components/User/UserHeader'
import { colors } from '@/constants'
import { useUserQuery } from '@/services/accountService'
import { useAuthQuery } from '@/services/api'

export const User: FC = () => {
  const { userId } = useParams()
  const { data, isLoading: isUserLoading } = useUserQuery(userId)
  const { data: currentUser, isLoading: isAuthLoading } = useAuthQuery()

  if (isUserLoading || isAuthLoading) return <Spinner.Centered />

  return (
    <div
      className='flex h-full flex-col p-4'
      style={{
        background: `linear-gradient(180deg, ${data?.color ?? colors[0]}, transparent 60%)`
      }}
    >
      <UserHeader isOwner={data?.id === currentUser?.id} />
      {data && (
        <Section className='mx-auto flex w-full max-w-80 flex-col gap-8 bg-transparent shadow-none md:mt-[20vh] md:bg-white md:shadow-md'>
          <ProfileView {...data} />
          <LinkItems
            items={data.links}
            className='overflow-y-auto md:max-h-56'
          />
        </Section>
      )}
      {!data && (
        <div className='flex h-full items-center justify-center'>
          <Section className='max-w-80'>
            <img src={NotFoundImage} />
            <h1 className='text-center text-2xl font-medium'>
              It seems like user does not exist.
            </h1>
          </Section>
        </div>
      )}
    </div>
  )
}
