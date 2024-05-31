import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { ShareLinkDialog } from '../Dialogs/ShareLinkDialog'
import { Logo } from '../Logo'
import { Section } from '../Section'

interface UserHeaderProps {
  isOwner: boolean
}

export const UserHeader: FC<UserHeaderProps> = ({ isOwner }) => {
  return (
    <Section
      as='header'
      className='sticky top-4 z-10 flex justify-between md:p-4'
    >
      {isOwner && (
        <>
          <Button asChild variant='outline'>
            <Link to='/links'>Back to Editor</Link>
          </Button>
          <ShareLinkDialog />
        </>
      )}
      {!isOwner && (
        <>
          <Link to='/'>
            <Logo />
          </Link>
          <Button>
            <Link to='/'>Create your own</Link>
          </Button>
        </>
      )}
    </Section>
  )
}
