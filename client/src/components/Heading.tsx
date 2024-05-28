import { FC } from 'react'

interface HeadingProps {
  title: string
  description?: string
}

export const Heading: FC<HeadingProps> = ({ title, description }) => {
  return (
    <>
      <h1 className='text-3xl font-bold text-gray-700'>{title}</h1>
      {description && <p className='my-2 text-gray-500'>{description}</p>}
    </>
  )
}
