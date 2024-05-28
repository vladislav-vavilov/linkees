import { FC } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { roles } from '@/constants'
import { type Role } from '@/types'

interface RoleSelectProps {
  onChange: (value: Role) => void
  value: Role
}

export const RoleSelect: FC<RoleSelectProps> = ({ onChange, value }) => {
  const items = Object.keys(roles) as Role[]

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder='Select your role' />
      </SelectTrigger>
      <SelectContent>
        {items.map((role) => (
          <SelectItem key={role} value={role}>
            {roles[role].label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
