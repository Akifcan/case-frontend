import styles from './basket.module.css'
import Image from 'next/image'
import { BasketProps } from './basket.types'
import { Link } from '@/i18n.config'
import { useTranslations } from 'next-intl'

export default function BasketCard({ basket }: Readonly<{ basket: BasketProps }>) {
  const t = useTranslations('basket')

  return (
    <Link href={`/product/${basket.product.slug}`} className="text-decoration-none">
      <div className={styles['basket-card']}>
        <div className={styles['basket-image']}>
          <Image
            priority={true}
            fill
            sizes={'100%'}
            src={basket.image.src}
            alt={basket.image.altTag}
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="flex column">
          <h2>{basket.product.name}</h2>
          <ul className="flex wrap">
            <li>
              <b>{t('quantity')}</b> <span>{basket.basket.quantity}</span>
            </li>
            <li>
              <b>{t('unitPrice')}</b> <span>{basket.pricing.labels.unitPrice}</span>
            </li>
            <li>
              <b>{t('totalPrice')}</b> <span>{basket.pricing.labels.totalPrice}</span>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  )
}
