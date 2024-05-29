import { FC } from 'react'

export const LinkItemsSkeleton: FC = () => {
  return (
    <div className='flex flex-col gap-2'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className='skeleton h-10 w-full' />
      ))}
    </div>
  )
}
