import { ProductProps } from '@/components/product/product.types'
import DeleteProductButton from './delete-product.button'

export default function AdminActions({ product }: Readonly<{ product: ProductProps }>) {
  return (
    <div className="flex column">
      Admin Actions
      <hr />
      <DeleteProductButton product={product} />
    </div>
  )
}
