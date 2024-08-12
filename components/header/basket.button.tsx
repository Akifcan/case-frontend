import BasketIcon from './icons/basket.icon'
import styles from './header.module.css'
import { useQuery } from '@tanstack/react-query'
import fetcher from '@/store/fetcher'
import { useUser } from '@/hooks/user.hook'
import { Link } from '@/i18n.config'

export default function BasketButton() {
  const { currency, visitorId } = useUser()

  const { data } = useQuery({
    queryKey: ['total-basket-item'],
    queryFn: async () => {
      return await fetcher<{ totalItem: number; error_code: string }>('/basket/count', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: {
          visitorId: visitorId,
          currency,
        },
      })
    },
  })

  return (
    <Link href={'/basket'} data-testid="basket-link-div">
      <div
        className={styles['basket-button']}
        title={data?.totalItem ? `There are ${data.totalItem} in the basket` : 'No item in this basket'}
        aria-label={data?.totalItem ? `There are ${data.totalItem} in the basket` : 'No item in this basket'}
      >
        {data && data.totalItem > 0 && (
          <div
            data-testid="basket-count-div"
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
