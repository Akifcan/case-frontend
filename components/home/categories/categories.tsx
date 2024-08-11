import CategoryCard from './category.card'
import styles from './categories.module.css'
import fetcher from '@/store/fetcher'
import { useQuery } from '@tanstack/react-query'
import { CategoryProps } from './category.types'
import Alert from '@/components/alert/alert'

export default function Categories() {
  const { error, data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await fetcher<CategoryProps[]>('/category', {
        method: 'GET',
      })
    },
  })

  return (
    <ul className={styles.categories}>
      {isLoading && <p>Categories loading...</p>}
      {error && <Alert type="error" message="Beklenmedik bir hata oluştu lütfen tekrar deneyin" />}
      {data && data.map((category) => <CategoryCard key={category.slug} category={category} />)}
    </ul>
  )
}
