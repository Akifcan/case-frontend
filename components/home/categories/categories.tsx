import CategoryCard from './category.card'
import styles from './categories.module.css'
import fetcher from '@/store/fetcher'
import { useQuery } from '@tanstack/react-query'
import { CategoryProps } from './category.types'
import Alert from '@/components/alert/alert'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import CloseIcon from './Icons/close.icon'

export default function Categories() {
  const { error, data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await fetcher<CategoryProps[]>('/category', {
        method: 'GET',
      })
    },
  })

  const router = useRouter()
  const throttler = useRef<boolean>(true)

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)

  const handleClearCategorySelection = () => {
    router.push('/')
    setSelectedCategory(undefined)
  }

  const handleCategory = (category: string) => {
    if (throttler.current) {
      setSelectedCategory(category)
      router.push(`/?category=${category}`)
      throttler.current = false
      setTimeout(() => {
        throttler.current = true
      }, 500)
    }
  }

  return (
    <ul className={styles.categories}>
      {isLoading && <p>Categories loading...</p>}
      {error && <Alert type="error" message="Beklenmedik bir hata oluştu lütfen tekrar deneyin" />}
      {data &&
        data.map((category) => (
          <CategoryCard
            key={category.slug}
            category={category}
            onCategorySelected={handleCategory}
            isActive={category.slug === selectedCategory}
          />
        ))}
      {selectedCategory && (
        <button onClick={handleClearCategorySelection} className="flex align-items-center wrap p-half">
          <CloseIcon /> Remove
        </button>
      )}
    </ul>
  )
}
