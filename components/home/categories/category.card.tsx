import styles from './categories.module.css'
import { CategoryProps } from './category.types'

export default function CategoryCard({ category }: Readonly<{ category: CategoryProps }>) {
  return <li className={styles.card}>{category.name}</li>
}
