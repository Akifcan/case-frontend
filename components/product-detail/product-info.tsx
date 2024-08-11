import Basket2 from '../header/icons/basket2'
import BuyIcon from '../header/icons/buy.icon'
import styles from './product-detail.module.css'
import toast from 'react-hot-toast'
export default function ProductInfo() {
  const handleRedirectToBasket = () => {
    toast('Here is your toast.')
  }

  const handleBasket = () => {
    toast('Here is your toast.')
  }

  return (
    <div className={['flex column flex-1'].join(' ')}>
      <h2>Product Name</h2>
      <hr />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus accusantium itaque est distinctio
        voluptates voluptatem iste deserunt doloremque nihil neque.
      </p>
      <div className={['flex align-items-center wrap', styles['price']].join(' ')} style={{ gap: '.3rem' }}>
        <s>200₺</s>
        <p>20₺</p>
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
