import { Link } from '@/i18n.config'
import PlusIcon from './icons/plus.icon'
import styles from './product.module.css'
export default function NewProductButton() {
  return (
    <Link href={'/product/new-product'} className="text-decoration-none align-items-center">
      <button
        data-testid="new-product-button"
        className={[styles['new-product-button'], 'flex', 'wrap'].join(' ')}
      >
        <PlusIcon />
        Create new product
      </button>
    </Link>
  )
}
