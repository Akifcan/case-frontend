import { useRouter } from '@/i18n.config'
import { useAppSelector } from '@/store/store'
import { useTranslations } from 'next-intl'
import { ReactNode, useEffect } from 'react'

export default function GuardContainer({ children }: Readonly<{ children: ReactNode }>) {
  const user = useAppSelector((state) => state.user.user)
  const loggedIn = useAppSelector((state) => state.user.loggedIn)
  const router = useRouter()
  const t = useTranslations()

  useEffect(() => {
    if (loggedIn === undefined) {
      return
    }
    if (loggedIn === false) {
      return router.push('/auth/login')
    }
  }, [loggedIn])

  return user ? <>{children}</> : <p data-testid="not-authorized-label">{t('auth.wait')}</p>
}
