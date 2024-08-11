import styles from './product.module.css'
import Link from 'next/link'
export default function ProductCard() {
  return (
    <Link href={''} as={'div'} className="flex column text-decoration-none" style={{ gap: '0' }}>
      <img
        className={styles['product-image']}
        src="https://images.unsplash.com/photo-1720048171731-15b3d9d5473f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <div className={styles['product-detail-footer']}>
        <h3>Product Name</h3>
        <div className="flex" style={{ gap: '.4rem' }}>
          <s>200₺</s>
          <span>200₺</span>
        </div>
      </div>
    </Link>
  )
}
