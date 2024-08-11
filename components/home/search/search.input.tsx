import { useEffect, useRef, useState } from 'react'
import SearchIcon from './icons/search.icon'
import styles from './search.module.css'
import { useRouter } from 'next/navigation'
import { useQueryParam } from '@/hooks/use-query-param.hook'

export default function SearchInput() {
  const debounce = useRef<NodeJS.Timeout>()
  const [keyword, setKeyword] = useState<string | undefined>(undefined)
  const router = useRouter()
  const isInitialized = useRef(false)

  const { getQueries } = useQueryParam()

  const handleSubmit = () => {
    router.push(`/${getQueries([{ key: 'keyword', value: keyword ?? '' }])}`)
  }

  useEffect(() => {
    if (keyword === undefined) {
      return
    }
    clearTimeout(debounce.current)
    debounce.current = setTimeout(handleSubmit, 500)
  }, [keyword])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      className={styles['search']}
    >
      <input
        required
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
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
