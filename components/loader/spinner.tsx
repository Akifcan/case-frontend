import { useTranslations } from 'next-intl'
import styles from './spinner.module.css'
export default function Spinner() {
  const t = useTranslations()

  return <span aria-label={t('product.wait')} className={styles['loader']}></span>
}
