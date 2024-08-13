import { ProductProps } from '@/components/product/product.types'
import DeleteProductButton from './delete-product.button'
import { useTranslations } from 'next-intl'

export default function AdminActions({ product }: Readonly<{ product: ProductProps }>) {
  const t = useTranslations('admin')

  return (
    <div className="flex column">
      {t('title')}
      <hr />
      <DeleteProductButton product={product} />
    </div>
  )
}
