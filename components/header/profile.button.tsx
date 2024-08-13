import { useUser } from '@/hooks/user.hook'
import Link from 'next/link'
import Badge from '../badge/badge'

export default function ProfileButton() {
  const { user } = useUser()
  return (
    <Link
      href="/profile"
      data-testid="go-to-profile-link"
      className='flex align-items-center"'
      style={{ textDecoration: 'none' }}
    >
      <span style={{ textDecoration: 'underline' }}>Go to profile - {user?.name}</span>
      {user?.role === 'Admin' && <Badge />}
    </Link>
  )
}
