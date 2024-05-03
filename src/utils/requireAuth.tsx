import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useTypedSelector } from '../hooks/useTypedSelector'

interface RequireAuthProps {
  children: ReactNode
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation()
  const { user } = useTypedSelector((state) => state.users)

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default RequireAuth
