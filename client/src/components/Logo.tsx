import { FC } from 'react'

interface LogoProps {
  size?: number
}

export const Logo: FC<LogoProps> = ({ size = 24 }) => {
  return (
    <div className='flex select-none items-center'>
      <div
        className='hidden sm:block'
        style={{ width: `${size + 4}px`, height: `${size + 4}px` }}
      >
        <LogoIcon />
      </div>
      <span className='font-medium' style={{ fontSize: `${size}px` }}>
        Link
        <span className='text-violet-500'>ee</span>s
      </span>
    </div>
  )
}

function LogoIcon() {
  return (
    <svg
      className='h-full w-full'
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961'
      />
    </svg>
  )
}
