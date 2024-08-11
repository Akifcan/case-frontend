import styles from './product.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { ProductProps } from './product.types'
export default function ProductCard({ product }: Readonly<{ product: ProductProps }>) {
  const firstImage = product.images[0]

  return (
    <Link href={''} as={'div'} className="flex column text-decoration-none" style={{ gap: '0' }}>
      <div className={styles['product-image']}>
        <Image
          fill
          src={firstImage.src}
          alt={firstImage.altTag}
          objectFit={'cover'}
          objectPosition={'center'}
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
            {product?.discountPrice && product.price}
            {product.currency}
          </span>
        </div>
      </div>
    </Link>
  )
}
