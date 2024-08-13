'use client'
import { useLocale } from 'next-intl'
import styles from './header.module.css'
import { ChangeEvent } from 'react'
import { Locale, usePathname, useRouter } from '@/i18n.config'
import Cookies from 'js-cookie'

export default function Language() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleAlternateLink = (locale: Locale): string | undefined => {
    const href = document?.head?.querySelector(`[hreflang='${locale}']`) as HTMLLinkElement
    return href?.href
  }

  const handleLocale = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale
    Cookies.set('NEXT_LOCALE', newLocale)
    const link = handleAlternateLink(newLocale)
    router.push(link ?? pathname, { locale: newLocale })
  }

  return (
    <>
      <select value={locale} onChange={handleLocale} className={styles['currency']}>
        <option value={'tr'}>Turkish</option>
        <option value={'en'}>English</option>
      </select>
    </>
  )
}
