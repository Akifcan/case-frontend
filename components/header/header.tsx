import Link from 'next/link'
import styles from './header.module.css'
import Currency from './currency'
import Language from './language'
import { useTranslations } from 'next-intl'

export default function Header() {
  const t = useTranslations('menu')

  return (
    <header className={styles.header}>
      <h1>Shop</h1>
      <nav className="flex wrap align-items-center">
        <Link href="/">{t('home')}</Link>
        <Link href="/">{t('login')}</Link>
        <Currency />
        <Language />
      </nav>
    </header>
  )
}
