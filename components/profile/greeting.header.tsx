import { useUser } from '@/hooks/user.hook'

export default function GreetingHeader() {
  const { user, logout } = useUser()

  return (
    <>
      <h2>Welcome, {user?.name}</h2>
      <button onClick={logout} className="p-half" style={{ width: 'max-content' }}>
        Logout
      </button>
    </>
  )
}
