import { ComponentType } from 'react'

import { colors, platforms, roles } from '@/constants'

export type Platform = keyof typeof platforms

export type Platforms = {
  [key in Platform]: {
    label: string
    domain: string
    icon: {
      default: ComponentType<Icon>
      solid: ComponentType<Icon>
    }
    color: string
  }
}

export type Link = {
  platform: Platform
  URI: string
  id: string
}

export type Icon = {
  size?: number
}

export type Role = keyof typeof roles

export type User = {
  username: string
  email: string
  avatar: string | null
  description?: string
  verified: boolean
  role: Role
  links: Link[]
  color: (typeof colors)[number]
  id: string
}
