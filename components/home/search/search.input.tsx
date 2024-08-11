import SearchIcon from './icons/search.icon'
import styles from './search.module.css'

export default function SearchInput() {
  return (
    <form className={styles['search']}>
      <input placeholder="Search here..." type="text" maxLength={200} />
      <button type="submit" aria-label="Search">
        <SearchIcon />
      </button>
    </form>
  )
}
