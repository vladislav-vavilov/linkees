import { FC, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface OutlinePhoneProps {
  children: ReactNode
  className?: string
  style?: { [key: string]: string }
}

export const OutlinePhone: FC<OutlinePhoneProps> = ({
  children,
  className,
  style
}) => {
  return (
    <div className='relative h-[450px] w-60 rounded-[42px] border-2 border-gray-400 sm:h-[490px] sm:w-64 md:h-[600px] md:w-72'>
      <div className='h-full w-full p-2'>
        <div className='flex h-full w-full flex-col overflow-hidden rounded-[34px] border-2 border-gray-400'>
          <div className='absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-b-xl border-2 border-t-0 border-gray-400 bg-white' />
          <div
            className={cn(
              'flex-auto overflow-y-auto rounded-[32px] p-6',
              className
            )}
            style={style}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
