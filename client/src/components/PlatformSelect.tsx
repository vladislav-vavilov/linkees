import { FC } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { platforms } from '@/constants'
import { type Platform } from '@/types'

interface PlatformSelectProps {
  value: Platform
  onChange: (value: Platform) => void
}

export const PlatformSelect: FC<PlatformSelectProps> = ({
  value,
  onChange
}) => {
  const items = Object.keys(platforms) as [Platform]

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select the platform' />
      </SelectTrigger>
      <SelectContent>
        {items.map((key) => {
          const Icon = platforms[key].icon

          return (
            <SelectItem key={key} value={key}>
              <div className='flex items-center gap-2 text-gray-600'>
                <Icon.default size={22} />
                <span className='text-base'>{platforms[key].label}</span>
              </div>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
