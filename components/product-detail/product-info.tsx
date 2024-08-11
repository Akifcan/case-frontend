import { currencySymbols } from '@/store/features/currency/currency.types'
import Basket2 from '../header/icons/basket2'
import BuyIcon from '../header/icons/buy.icon'
import { ProductProps } from '../product/product.types'
import styles from './product-detail.module.css'
import toast, { Toaster } from 'react-hot-toast'
export default function ProductInfo({ product }: Readonly<{ product: ProductProps }>) {
  const handleRedirectToBasket = () => {
    toast('Here is your toast.', { position: 'top-right' })
  }

  const handleBasket = () => {
    toast('Here is your toast.')
  }

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
        </span>{' '}
      </div>
      <div className={['flex align-items-center wrap', styles['price']].join(' ')} style={{ gap: '.3rem' }}>
        <button onClick={handleRedirectToBasket} className={styles['purchase-button']}>
          <BuyIcon /> Buy now
        </button>
        <button onClick={handleBasket} className={styles['purchase-button']}>
          <Basket2 />
          Add to basket
        </button>
      </div>
    </div>
  )
}
