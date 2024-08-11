import CategoryCard from './category.card'
import styles from './categories.module.css'

export default function Categories() {
  return (
    <ul className={styles.categories}>
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
    </ul>
  )
}
