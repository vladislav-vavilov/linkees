import { useRef } from 'react'

export const useDebounce = (callback: () => void, delay: number) => {
  const ref = useRef<ReturnType<typeof setTimeout>>()

  return (...args) => {
    clearTimeout(ref.current)
    ref.current = setTimeout(() => callback(...args), delay)
  }
}
