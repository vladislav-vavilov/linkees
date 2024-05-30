import { Label } from '@radix-ui/react-label'
import { Plus } from 'lucide-react'
import { FC } from 'react'

import { roles } from '@/constants'
import { useAppSelector } from '@/hooks/redux'
import { selectCurrentUser } from '@/store/slices/userSlice'

interface ProfileFieldsProps {
  handleOpen: () => void
}

export const ProfileFields: FC<ProfileFieldsProps> = ({ handleOpen }) => {
  const { username, email, description, role } =
    useAppSelector(selectCurrentUser)

  const fields = [
    {
      label: 'username',
      value: username
    },
    {
      label: 'email',
      value: email
    },
    {
      label: 'description',
      value: description
    },
    {
      label: 'role',
      value: roles[role].label
    }
  ]

  return (
    <div className='flex flex-col gap-4 rounded-md bg-white p-4 shadow-sm'>
      {fields.map(({ label, value }) => (
        <div key={label} className='flex flex-col'>
          <Label className='capitalize'>{label}</Label>
          {value && <span>{value}</span>}
          {!value && (
            <button
              onClick={handleOpen}
              className='flex items-center text-sm text-gray-700 underline'
            >
              <Plus size={14} />
              <span>Add {label}</span>
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
