import { useRef } from 'react'
import SearchIcon from './icons/search.icon'
import styles from './search.module.css'
import { useRouter } from 'next/navigation'
import { useQueryParam } from '@/hooks/use-query-param.hook'

export default function SearchInput() {
  const debounce = useRef<NodeJS.Timeout>()
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const { getQueries } = useQueryParam()

  const handleSubmit = () => {
    clearTimeout(debounce.current)
    debounce.current = setTimeout(() => {
      const keyword = inputRef.current?.value
      router.push(`/${getQueries([{ key: 'keyword', value: keyword ?? '' }])}`)
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
        ref={inputRef}
        onChange={handleSubmit}
        required
        placeholder="Search here..."
        type="text"
        maxLength={200}
      />
      <button type="submit" aria-label="Search">
        <SearchIcon />
      </button>
    </form>
  )
}
