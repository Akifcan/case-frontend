import { useRouter } from '@/i18n.config'
import { setLoggedIn, setUser } from '@/store/features/user/user.slice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import Cookies from 'js-cookie'

export const useUser = () => {
  const currency = useAppSelector((state) => state.currency.currency)
  const user = useAppSelector((state) => state.user.user)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const logout = () => {
    Cookies.remove('AUTH_TOKEN')
    dispatch(setLoggedIn(false))
    dispatch(setUser(undefined))
    router.push('/')
  }

  const handleVisitorId = () => {
    if (!Cookies.get('VISITOR_ID')) {
      Cookies.set('VISITOR_ID', `${Math.floor(Math.random() * 99999)}`)
    }
    return Number(Cookies.get('VISITOR_ID'))
  }

  return {
    logout,
    user,
    visitorId: handleVisitorId(),
    currency: Cookies.get('APP_CURRENCY') ?? currency,
  }
}
