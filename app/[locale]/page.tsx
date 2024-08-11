'use client'
import Alert from '@/components/alert/alert'
import Categories from '@/components/home/categories/categories'
import SearchInput from '@/components/home/search/search.input'
import ProductCard from '@/components/product/product.card'
import { ProductProps } from '@/components/product/product.types'
import fetcher from '@/store/fetcher'
import { useAppSelector } from '@/store/store'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

export default function Page() {
  const searchParams = useSearchParams()
  const currency = useAppSelector((state) => state.currency.currency)

  const { error, data, isLoading, refetch } = useQuery({
    enabled: false,
    queryKey: ['products'],
    queryFn: async () => {
      return await fetcher<{ products: ProductProps[]; totalPage: number }>('/product?page=1&limit=5', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: {
          keyword: searchParams.get('keyword') ?? undefined,
          category: searchParams.get('category') ?? undefined,
          currency: Cookies.get('APP_CURRENCY') ?? currency,
        },
      })
    },
  })

  useEffect(() => {
    refetch()
  }, [searchParams, currency])

  return (
    <main className="flex column mt-1" style={{ gap: '1rem' }}>
      <SearchInput />
      <Categories />
      {error && <Alert type="error" message="Beklenmedik bir hata oluştu lütfen tekrar deneyin" />}
      {isLoading && <p>Ürünler yükleniyor...</p>}
      {data && (
        <>
          {data?.products.length > 0 && (
            <div className="grid">
              {data.products.map((product) => {
                return <ProductCard key={product.id} product={product} />
              })}
            </div>
          )}
          {data?.products.length <= 0 && <Alert type="info" message="Ürün bulunamadı" />}
        </>
      )}
    </main>
  )
}
