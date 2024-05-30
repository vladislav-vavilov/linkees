import { Eye, Link2, User } from 'lucide-react'
import { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/hooks/redux'
import { selectCurrentUser } from '@/store/slices/userSlice'

import { Logo } from '../Logo'
import { Section } from '../Section'

export const Header: FC = () => {
  const { id } = useAppSelector(selectCurrentUser)

  const navLinks = [
    {
      label: 'Links',
      icon: Link2,
      path: '/links'
    },
    {
      label: 'Profile Details',
      icon: User,
      path: '/profile'
    }
  ]

  return (
    <header>
      <Section className='flex items-center justify-between p-4'>
        <Link to='/'>
          <Logo />
        </Link>
        <ul className='flex gap-2 sm:gap-4'>
          {navLinks.map(({ label, icon: Icon, path }) => (
            <li key={path}>
              <Button
                asChild
                variant='link'
                className='flex gap-2 text-gray-500 [&.active]:bg-violet-400/20 [&.active]:text-violet-600'
              >
                <NavLink to={path}>
                  <Icon size={20} />
                  <span className='hidden md:inline'>{label}</span>
                </NavLink>
              </Button>
            </li>
          ))}
        </ul>
        <Button variant='outline' asChild>
          <Link to={`/${id}`}>
            <Eye size={20} className='sm:hidden' />
            <span className='hidden sm:inline'>Preview</span>
          </Link>
        </Button>
      </Section>
    </header>
  )
}
