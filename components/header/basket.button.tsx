import BasketIcon from './icons/basket.icon'
import styles from './header.module.css'
import Link from 'next/link'
import { useAppSelector } from '@/store/store'
import { useQuery } from '@tanstack/react-query'
import fetcher from '@/store/fetcher'
import Cookies from 'js-cookie'

export default function BasketButton() {
  const currency = useAppSelector((state) => state.currency.currency)

  const { data } = useQuery({
    queryKey: ['total-basket-item'],
    queryFn: async () => {
      return await fetcher<{ totalItem: number; error_code: string }>('/basket/count', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: {
          visitorId: Number(Cookies.get('VISITOR_ID')),
          currency: Cookies.get('APP_CURRENCY') ?? currency,
        },
      })
    },
  })

  return (
    <Link href={''}>
      <div
        className={styles['basket-button']}
        title={data?.totalItem ? `There are ${data.totalItem} in the basket` : 'No item in this basket'}
        aria-label={data?.totalItem ? `There are ${data.totalItem} in the basket` : 'No item in this basket'}
      >
        {data && data.totalItem > 0 && (
          <div
            aria-label={`There are ${data.totalItem} in the basket`}
            className={styles['basket-button-badge']}
          >
            {data.totalItem}
          </div>
        )}
        <BasketIcon />
      </div>
    </Link>
  )
}
