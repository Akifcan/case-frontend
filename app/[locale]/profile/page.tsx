'use client'
import GuardContainer from '@/containers/guard.container'
import { useUser } from '@/hooks/user.hook'

export default function Profile() {
  const { user, logout } = useUser()
  return (
    <GuardContainer>
      <div className="flex column mt-2">
        <h2>Welcome, {user?.name}</h2>
        <button onClick={logout} className="p-half" style={{ width: 'max-content' }}>
          Logout
        </button>
      </div>
    </GuardContainer>
  )
}
