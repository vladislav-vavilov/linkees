import { FC, ReactNode } from 'react'

interface ProfileSectionProps {
  title: string
  description?: string
  children: ReactNode
}

export const ProfileSection: FC<ProfileSectionProps> = ({
  title,
  description,
  children
}) => {
  return (
    <div>
      <h2 className='text-xl font-medium'>{title}</h2>
      {description && (
        <p className='pb-2 text-sm leading-none text-gray-500'>{description}</p>
      )}
      <div className='pt-2'>{children}</div>
    </div>
  )
}
