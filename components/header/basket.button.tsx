import BasketIcon from './icons/basket.icon'
import styles from './header.module.css'

export default function BasketButton() {
  return (
    <div className={styles['basket-button']}>
      <div className={styles['basket-button-badge']}>2</div>
      <BasketIcon />
    </div>
  )
}
