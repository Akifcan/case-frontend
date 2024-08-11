'use client'
import ProductImagesList from '@/components/product-detail/product-images.list'
import ProductInfo from '@/components/product-detail/product-info'
import styles from '@/components/product-detail/product-detail.module.css'
import { useQuery } from '@tanstack/react-query'
import fetcher from '@/store/fetcher'
import { useAppSelector } from '@/store/store'
import Cookies from 'js-cookie'
import { ProductProps } from '@/components/product/product.types'
import { useParams } from 'next/navigation'
import Alert from '@/components/alert/alert'
import { useEffect } from 'react'
import { useUser } from '@/hooks/user.hook'

export default function Page() {
  const currency = useAppSelector((state) => state.currency.currency)
  const { slug } = useParams()
  const { visitorId, currency: userCurrency } = useUser()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      return await fetcher<{ product?: ProductProps; error_code: string }>(`/product/${slug}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: {
          visitorId,
          currency: userCurrency,
        },
      })
    },
  })

  useEffect(() => {
    refetch()
  }, [currency])

  return (
    <div className={['mt-2 flex wrap', styles['product-wrapper']].join(' ')}>
      {data?.error_code && <Alert type="error" message="Beklenmedik bir hata oluştu lütfen tekrar deneyin" />}
      {isLoading && <p>Ürünler yükleniyor...</p>}
      {data?.product && (
        <>
          <ProductImagesList product={data.product} />
          <ProductInfo product={data.product} />
        </>
      )}
    </div>
  )
}
