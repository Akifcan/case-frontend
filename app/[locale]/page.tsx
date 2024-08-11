'use client'
import fetcher from '@/store/fetcher'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
export default function Page() {
  const t = useTranslations('menu')

  const { isFetching, error, data, refetch } = useQuery({
    enabled: false,
    queryKey: ['products'],
    queryFn: async () => {
      return await fetcher('/product?page=1&limit=5', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: {
          category: 2,
          currency: 'tl',
        },
      })
    },
  })

  const demo = () => {
    refetch()
  }

  return (
    <>
      <p>{t('home')}</p>
      <button onClick={demo}>demo</button>
      <p>{JSON.stringify(data)}</p>
      <p>{JSON.stringify(error)}</p>
      <p>{isFetching.toString()}</p>
    </>
  )
}
