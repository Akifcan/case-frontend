'use client'
import { useLocale } from 'next-intl'
import styles from './header.module.css'
import { ChangeEvent } from 'react'
import { Locale, usePathname, useRouter } from '@/i18n.config'

export default function Language() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLocale = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <select value={locale} onChange={handleLocale} className={styles['currency']}>
      <option value={'tr'}>Turkish</option>
      <option value={'en'}>English</option>
    </select>
  )
}
