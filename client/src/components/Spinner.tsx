import { Loader2 } from 'lucide-react'

interface SpinnerProps {
  size?: number
}

export const Spinner = ({ size = 48 }: SpinnerProps) => {
  return <Loader2 size={size} className='animate-spin text-violet-600' />
}

Spinner.Centered = ({ size = 48 }: SpinnerProps) => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <Spinner size={size} />
    </div>
  )
}
