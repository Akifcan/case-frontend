import { useSearchParams } from 'next/navigation'

export const useQueryParam = () => {
  const searchParams = useSearchParams()

  const getQueries = (queries: { key: string; value: string }[]) => {
    const x = new URLSearchParams(Object.fromEntries(searchParams.entries()))
    queries.forEach((query) => x.set(query.key, query.value))
    return '?' + x.toString()
  }

  return { getQueries, searchParams }
}
