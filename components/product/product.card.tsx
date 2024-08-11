import styles from './product.module.css'
import Image from 'next/image'
import { ProductProps } from './product.types'
import { currencySymbols } from '@/store/features/currency/currency.types'
import { Link } from '@/i18n.config'
export default function ProductCard({ product }: Readonly<{ product: ProductProps }>) {
  const firstImage = product.images[0]

  return (
    <Link href={`/product/${product.slug}`} className="flex column text-decoration-none" style={{ gap: '0' }}>
      <div className={styles['product-image']}>
        <Image
          fill
          sizes={'100%'}
          src={firstImage.src}
          alt={firstImage.altTag}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles['product-detail-footer']}>
        <h3>{product.name}</h3>
        <div className="flex" style={{ gap: '.4rem' }}>
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
      </div>
    </Link>
  )
}
