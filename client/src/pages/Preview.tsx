import { FC } from 'react'
import { Link } from 'react-router-dom'

import { LinkItems } from '@/components/LinkItems'
import { ProfileView } from '@/components/ProfileView'
import { Section } from '@/components/Section'
import { ShareLinkDialog } from '@/components/ShareLinkDialog'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/hooks/redux'
import { selectUser } from '@/store/slices/userSlice'

export const Preview: FC = () => {
  const { color } = useAppSelector(selectUser)

  return (
    <div
      className='flex flex-col p-4'
      style={{
        background: `linear-gradient(180deg, ${color}, transparent 60%)`
      }}
    >
      <header>
        <Section className='flex justify-between p-4'>
          <Button asChild variant='outline'>
            <Link to='/links'>Back to Editor</Link>
          </Button>
          <ShareLinkDialog link='https://google.com' />
        </Section>
      </header>
      <Section className='mx-auto flex w-full max-w-80 flex-col gap-8 overflow-y-auto bg-transparent shadow-none md:mt-32 md:bg-white md:shadow-md'>
        <ProfileView size='lg' />
        <LinkItems className='overflow-y-auto md:max-h-80' />
      </Section>
    </div>
  )
}
