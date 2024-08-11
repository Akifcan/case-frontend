import styles from './categories.module.css'
import { CategoryProps } from './category.types'

export default function CategoryCard({
  category,
  onCategorySelected,
  isActive,
}: Readonly<{ category: CategoryProps; onCategorySelected: (category: string) => void; isActive: boolean }>) {
  const handleCategory = () => {
    onCategorySelected(category.slug)
  }

  return (
    <li onClick={handleCategory} className={[styles.card, isActive ? styles.active : ''].join(' ')}>
      {category.name}
    </li>
  )
}
