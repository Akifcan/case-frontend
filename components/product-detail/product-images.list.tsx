import Image from 'next/image'
import styles from './product-detail.module.css'
import { useEffect, useRef, useState } from 'react'
import { ProductImageProps, ProductProps } from '../product/product.types'
import { useTranslations } from 'next-intl'

export default function ProductImagesList({ product }: Readonly<{ product: ProductProps }>) {
  const parentRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)
  const [thumbnail, setThumbnail] = useState<ProductImageProps>()
  const t = useTranslations('product')

  const resize = () => {
    const el = childRef.current
    if (!el) {
      return
    }
    el.style.display = 'none'
    const width = parentRef.current?.clientWidth

    if (!width) {
      return
    }
    el.style.width = `${width}px`
    el.style.display = 'flex'
  }

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div ref={parentRef} className={'flex column flex-1 overflow-hidden'} data-testid="product-images-div">
      <h1>{product.name}</h1>
      <hr />
      <div className={styles['product-thumbnail']}>
        <Image
          priority={true}
          fill
          sizes={'100%'}
          src={thumbnail?.src ?? product.images[0].src}
          alt={thumbnail?.altTag ?? product.images[0].src}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div ref={childRef} className={styles['product-image-list']}>
        {product.images.map((image) => {
          return (
            <div
              title={t('imageAria')}
              aria-label={t('imageAria')}
              onClick={() => setThumbnail(image)}
              key={image.src}
              className={[styles['product-image-card']].join(' ')}
            >
              <Image
                key={Math.random()}
                fill
                sizes={'100%'}
                src={image.src}
                alt={image.altTag}
                style={{ objectFit: 'cover' }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
