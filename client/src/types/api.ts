import { User } from '.'
import { Link } from './index'
import { RequireAtLeastOne } from './utils'

export type RegisterRequest = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export type LoginRequest = Omit<RegisterRequest, 'confirmPassword' | 'username'>
export interface LoginResponse {
  token: string
  message: string
}

export type BaseResponse = { message: string }

export type UpdateProfileRequest = RequireAtLeastOne<
  Pick<User, 'username' | 'description' | 'email' | 'role' | 'color'>
>

export type UpdatePasswordRequest = {
  currentPassword: string
  newPassword: string
}

export type UpdateLinkRequest = RequireAtLeastOne<Link> & {
  id: string
}

export type ReorderLinksRequest = {
  id: string
  destination: number
}
