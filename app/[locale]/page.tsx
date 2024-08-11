'use client'
import Alert from '@/components/alert/alert'
import Categories from '@/components/home/categories/categories'
import SearchInput from '@/components/home/search/search.input'
import ProductCard from '@/components/product/product.card'
import { ProductProps } from '@/components/product/product.types'
import fetcher from '@/store/fetcher'
import { useQuery } from '@tanstack/react-query'
export default function Page() {
  const { error, data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      return await fetcher<{ products: ProductProps[]; totalPage: number }>('/product?page=1&limit=5', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: {
          category: 2,
          currency: 'tl',
        },
      })
    },
  })

  return (
    <main className="flex column mt-1" style={{ gap: '1rem' }}>
      <SearchInput />
      <Categories />
      {error && <Alert type="error" message="Beklenmedik bir hata oluştu lütfen tekrar deneyin" />}
      {isLoading && <p>Ürünler yükleniyor...</p>}
      {data && (
        <div className="grid">
          {data.products.map((product) => {
            return <ProductCard key={product.id} product={product} />
          })}
        </div>
      )}
    </main>
  )
}
