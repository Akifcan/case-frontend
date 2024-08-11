'use client'
import styles from './header.module.css'
import Currency from './currency'
import Language from './language'
import { useTranslations, useLocale } from 'next-intl'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { Link } from '@/i18n.config'

export default function Header() {
  const t = useTranslations('menu')
  const locale = useLocale()

  const handleLocale = () => {
    Cookies.set('NEXT_LOCALE', locale)
  }

  useEffect(handleLocale, [])

  return (
    <header className={styles.header}>
      <Link href={'/'} className="text-decoration-none">
        <h1>Shop</h1>
      </Link>
      <nav className="flex wrap align-items-center">
        <Link href="/">{t('home')}</Link>
        <Link href="/">{t('login')}</Link>
        <Currency />
        <Language />
      </nav>
    </header>
  )
}
