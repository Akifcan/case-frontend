import { useAppSelector } from '@/store/store'
import Cookies from 'js-cookie'

export const useUser = () => {
  const currency = useAppSelector((state) => state.currency.currency)

  const handleVisitorId = () => {
    if (!Cookies.get('VISITOR_ID')) {
      Cookies.set('VISITOR_ID', `${Math.floor(Math.random() * 99999)}`)
    }
    return Number(Cookies.get('VISITOR_ID'))
  }

  return {
    visitorId: handleVisitorId(),
    currency: Cookies.get('APP_CURRENCY') ?? currency,
  }
}
