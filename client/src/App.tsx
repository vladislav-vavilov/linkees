import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthLayout } from '@/components/Layouts/AuthLayout'
import { MainLayout } from '@/components/Layouts/MainLayout'
import { PrivateRoute } from '@/components/ProtectedRoute'
import { Links } from '@/pages/Links'
import { Login } from '@/pages/Login'
import { Profile } from '@/pages/Profile'
import { Register } from '@/pages/Register'
import { User } from '@/pages/User'

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/links' />} />
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path='/links' element={<Links />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Route>
      <Route path=':userId' element={<User />} />
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
    </Routes>
  )
}
