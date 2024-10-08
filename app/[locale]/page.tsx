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
import Pagination from '@/components/home/pagination/pagination'
import { useQueryParam } from '@/hooks/use-query-param.hook'
import { useRouter } from '@/i18n.config'
import { useUser } from '@/hooks/user.hook'
import { useTranslations } from 'next-intl'
import NewProductButton from '@/components/product/new-product.button'

export default function Page() {
  const searchParams = useSearchParams()
  const currency = useAppSelector((state) => state.currency.currency)
  const { getQueries } = useQueryParam()
  const router = useRouter()
  const user = useUser()
  const t = useTranslations()

  const { error, data, isLoading, refetch } = useQuery({
    enabled: false,
    queryKey: ['products'],
    queryFn: async () => {
      return await fetcher<{ products: ProductProps[]; totalPage: number }>(
        `/product?page=${searchParams.get('page') ?? 1}&limit=3`,
        {
          method: 'POST',
          body: {
            keyword: searchParams.get('keyword') ?? undefined,
            category: searchParams.get('category') ?? undefined,
            currency: user.currency,
          },
        },
      )
    },
  })

  const handlePageChange = (page: number) => {
    router.push(`/${getQueries([{ key: 'page', value: page.toString() }])}`)
  }
  useEffect(() => {
    refetch()
  }, [searchParams, currency, router])

  return (
    <main className="flex column mt-1" style={{ gap: '1rem' }}>
      <SearchInput />
      <Categories />
      {user.user?.role === 'Admin' && <NewProductButton />}
      {error && <Alert type="error" message={t('common.error')} />}
      {isLoading && <p>{t('basket.loading')}</p>}
      {data && (
        <>
          {data?.products?.length > 0 && (
            <div className="flex column" data-testid="products-div">
              <section className="grid">
                {data.products.map((product) => {
                  return <ProductCard key={product.id} product={product} />
                })}
              </section>
              <div className="flex align-items-center justify-content-center">
                <Pagination onChange={handlePageChange} totalPages={data.totalPage} />
              </div>
            </div>
          )}
          {data?.products?.length <= 0 && <Alert type="info" message={t('product.noProduct')} />}
        </>
      )}
    </main>
  )
}
