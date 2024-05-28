import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { type BaseResponse } from '@/types/api'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const isEqual = (firstValue: unknown, secondValue: unknown) => {
  return JSON.stringify(firstValue) === JSON.stringify(secondValue)
}

export const hasKey = <Key extends string>(
  obj: unknown,
  key: Key
): obj is object & Record<Key, unknown> => {
  return typeof obj === 'object' && obj !== null && key in obj
}

export const getApiError = <Error>(error: unknown): Error | undefined => {
  if (hasKey(error, 'data')) {
    return error.data as Error
  }
}

export const getApiErrorMessage = (error: unknown) => {
  return getApiError<BaseResponse>(error)?.message ?? 'Something went wrong...'
}
