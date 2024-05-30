import { FC, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export const Section: FC<SectionProps> = ({
  children,
  className,
  as: As = 'div'
}) => {
  return (
    <As
      className={cn(
        'overflow-y-auto rounded-md bg-white p-8 shadow-md',
        className
      )}
    >
      {children}
    </As>
  )
}
