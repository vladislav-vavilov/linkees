/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react'

export function useDebounce<Func extends (...args: any[]) => any>(
  callback: Func,
  delay: number
) {
  const ref = useRef<ReturnType<typeof setTimeout>>()

  return (...args: Parameters<Func>) => {
    clearTimeout(ref.current)
    ref.current = setTimeout(() => callback(...args), delay)
  }
}
