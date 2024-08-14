import PlusIcon from './icons/plus.icon'
import styles from './product.module.css'
export default function NewProductButton() {
  return (
    <button
      data-testid="new-product-button"
      className={[styles['new-product-button'], 'flex', 'wrap', 'align-items-center'].join(' ')}
    >
      <PlusIcon />
      Create new product
    </button>
  )
}
