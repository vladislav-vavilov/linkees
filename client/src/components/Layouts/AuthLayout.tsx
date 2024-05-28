import { Outlet } from 'react-router-dom'

import { Logo } from '../Logo'

export const AuthLayout = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-violet-500 to-gray-200 to-45%'>
      <div className='flex w-full max-w-sm flex-col items-center gap-4 rounded-md bg-white p-4 shadow-md'>
        <Logo size={30} />
        <Outlet />
      </div>
    </div>
  )
}
