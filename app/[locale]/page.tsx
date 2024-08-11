'use client'
import Categories from '@/components/home/categories/categories'
import SearchInput from '@/components/home/search/search.input'
import ProductCard from '@/components/product/product.card'
import { ProductProps } from '@/components/product/product.types'
import fetcher from '@/store/fetcher'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
export default function Page() {
  const t = useTranslations('menu')

  const { error, data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      return await fetcher<{ products: ProductProps; totalPage: number }>('/product?page=1&limit=5', {
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
      {data && (
        <div className="grid">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      )}
    </main>
  )
}
