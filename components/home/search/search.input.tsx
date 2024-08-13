import { useRef } from 'react'
import SearchIcon from './icons/search.icon'
import styles from './search.module.css'
import { useRouter } from 'next/navigation'
import { useQueryParam } from '@/hooks/use-query-param.hook'
import { useTranslations } from 'next-intl'

export default function SearchInput() {
  const debounce = useRef<NodeJS.Timeout>()
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const t = useTranslations()

  const { getQueries } = useQueryParam()

  const handleSubmit = () => {
    clearTimeout(debounce.current)
    debounce.current = setTimeout(() => {
      const keyword = inputRef.current?.value
      router.push(
        `/${getQueries([
          { key: 'page', value: '1' },
          { key: 'keyword', value: keyword ?? '' },
        ])}`,
      )
    }, 500)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      className={styles['search']}
    >
      <input
        data-testid="search-product-input"
        ref={inputRef}
        onChange={handleSubmit}
        required
        placeholder={t('common.search')}
        type="text"
        maxLength={200}
      />
      <button type="submit" aria-label={t('common.search')}>
        <SearchIcon />
      </button>
    </form>
  )
}
