'use client'
import ProductImagesList from '@/components/product-detail/product-images.list'
import ProductInfo from '@/components/product-detail/product-info'
import styles from '@/components/product-detail/product-detail.module.css'

export default function Page() {
  return (
    <div className={['mt-2 flex wrap', styles['product-wrapper']].join(' ')}>
      <ProductImagesList />
      <ProductInfo />
    </div>
  )
}
