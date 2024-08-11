import Image from 'next/image'
import styles from './product-detail.module.css'
import { useEffect, useRef, useState } from 'react'
import { ProductImageProps, ProductProps } from '../product/product.types'

export default function ProductImagesList({ product }: Readonly<{ product: ProductProps }>) {
  const parentRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)
  const [thumbnail, setThumbnail] = useState<ProductImageProps>(product.images[0])

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
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <div ref={parentRef} className={'flex column flex-1 overflow-hidden'}>
      <h1>{product.name}</h1>
      <hr />
      <div className={styles['product-thumbnail']}>
        <Image
          fill
          sizes={'100%'}
          src={thumbnail.src}
          alt={thumbnail.altTag}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div ref={childRef} className={styles['product-image-list']}>
        {product.images.map((image) => {
          return (
            <div
              aria-label="Click image for view"
              onClick={() => setThumbnail(image)}
              key={image.src}
              className={[styles['product-image-card']].join(' ')}
            >
              <Image fill sizes={'100%'} src={image.src} alt={image.altTag} style={{ objectFit: 'cover' }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
