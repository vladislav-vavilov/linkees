import { FC } from 'react'

import { Button } from '../ui/button'

interface LinksFetchingErrorProps {
  isFetching: boolean
  refetch: () => void
}

export const LinksFetchingError: FC<LinksFetchingErrorProps> = ({
  isFetching,
  refetch
}) => {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-2'>
      <span className='text-center leading-none text-red-600'>
        An error occurred when fetching links.
      </span>
      <Button
        onClick={refetch}
        disabled={isFetching}
        variant='secondary'
        size='sm'
      >
        Try again
      </Button>
    </div>
  )
}
