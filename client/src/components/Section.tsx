import { FC, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
}

export const Section: FC<SectionProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'overflow-y-auto rounded-md bg-white p-8 shadow-md',
        className
      )}
    >
      {children}
    </div>
  )
}
