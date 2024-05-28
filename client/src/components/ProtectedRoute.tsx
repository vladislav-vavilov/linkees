import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Spinner } from '@/components/Spinner'
import { useAppSelector } from '@/hooks/redux'
import { useAuthQuery } from '@/services/api'

export const PrivateRoute: FC = () => {
  // Токен передается для того, чтобы рефетчить данные при его изменении (logout). В самом эндпоинте он не используется
  const token = useAppSelector((state) => state.user.token)
  const { currentData, isLoading } = useAuthQuery(token)

  if (isLoading) return <Spinner.Centered />
  if (currentData) return <Outlet />

  return <Navigate to='/login' />
}
