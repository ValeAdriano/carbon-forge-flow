import { Navigate, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { UserType } from '@/types'

export default function PrivateRoute({ roles, children }: { roles?: UserType[]; children: ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }
  if (roles && !roles.includes(user.type)) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}
