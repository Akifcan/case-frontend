import { useUser } from '@/hooks/user.hook'
import { useTranslations } from 'next-intl'

export default function GreetingHeader() {
  const { user, logout } = useUser()
  const t = useTranslations()

  return (
    <>
      <h2>
        {t('common.welcome')}, {user?.name}
      </h2>
      <button onClick={logout} className="p-half m-h30" style={{ width: 'max-content' }}>
        {t('auth.logout')}
      </button>
    </>
  )
}
