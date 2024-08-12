import { currencySymbols } from '@/store/features/currency/currency.types'
import Basket2 from '../header/icons/basket2'
import BuyIcon from '../header/icons/buy.icon'
import { ProductProps } from '../product/product.types'
import styles from './product-detail.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import fetcher from '@/store/fetcher'
import { useUser } from '@/hooks/user.hook'
import { queryClient } from '@/store/redux.provider'
import { useRouter } from 'next/navigation'

export default function ProductInfo({ product }: Readonly<{ product: ProductProps }>) {
  const { visitorId, currency } = useUser()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async ({ redirect: boolean }: { redirect: boolean }) => {
      return await fetcher<{ message?: string; error_code?: string }>(`/basket/${product.product.id}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: {
          visitorId,
          currency,
        },
      })
    },
    onSuccess: (data, vars) => {
      if (vars.redirect) {
        router.push('/basket')
      } else {
        toast(data.message ?? data.error_code ?? '', { position: 'top-right' })
        queryClient.invalidateQueries({ queryKey: ['total-basket-item'] })
      }
    },
  })

  const handleRedirectToBasket = () => mutation.mutate({ redirect: true })

  const handleBasket = () => mutation.mutate({ redirect: false })

  return (
    <div className={['flex column flex-1'].join(' ')}>
      <Toaster />
      <h2>{product.name}</h2>
      <hr />
      <p>{product.description}</p>
      <div className={['flex align-items-center wrap', styles['price']].join(' ')} style={{ gap: '.3rem' }}>
        {product.discountPrice && (
          <s>
            {product.price}
            {product.currency}
          </s>
        )}
        <span>
          {product?.discountPrice || product.price}
          {currencySymbols[product.currency]}
        </span>
      </div>
      {!mutation.isPending && (
        <div className={['flex align-items-center wrap', styles['price']].join(' ')} style={{ gap: '.3rem' }}>
          <button onClick={handleRedirectToBasket} className={styles['purchase-button']}>
            <BuyIcon /> Buy now
          </button>
          <button onClick={handleBasket} className={styles['purchase-button']}>
            <Basket2 />
            Add to basket
          </button>
        </div>
      )}
      {mutation.isPending && <p>Please wait</p>}
    </div>
  )
}
