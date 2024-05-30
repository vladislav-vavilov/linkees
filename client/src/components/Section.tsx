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
        'rounded-md bg-white p-4 shadow-md md:overflow-y-auto md:p-8',
        className
      )}
    >
      {children}
    </As>
  )
}
