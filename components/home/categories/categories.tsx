import CategoryCard from './category.card'
import styles from './categories.module.css'
import fetcher from '@/store/fetcher'
import { useQuery } from '@tanstack/react-query'
import { CategoryProps } from './category.types'
import Alert from '@/components/alert/alert'
import { useEffect, useRef, useState } from 'react'
import CloseIcon from './Icons/close.icon'
import { useQueryParam } from '@/hooks/use-query-param.hook'
import { useRouter } from '@/i18n.config'
import { useTranslations } from 'next-intl'

export default function Categories() {
  const { getQueries, searchParams } = useQueryParam()
  const t = useTranslations()

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
    router.push('/?page=1')
    setSelectedCategory(undefined)
  }

  const handleCategory = (category: string) => {
    if (throttler.current) {
      setSelectedCategory(category)
      router.push(
        `/${getQueries([
          { key: 'category', value: category },
          { key: 'page', value: '1' },
        ])}`,
      )

      throttler.current = false
      setTimeout(() => {
        throttler.current = true
      }, 500)
    }
  }

  const handleInitialCategory = () => {
    const category = searchParams.get('category')
    if (!category) {
      return setSelectedCategory(undefined)
    }
    setSelectedCategory(category)
  }

  useEffect(handleInitialCategory, [searchParams])

  return (
    <ul className={styles.categories} data-testid="categories-ul">
      {isLoading && <p>Categories loading...</p>}
      {error && <Alert type="error" message={t('common.error')} />}
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
          <CloseIcon /> {t('category.removeButton')}
        </button>
      )}
    </ul>
  )
}
