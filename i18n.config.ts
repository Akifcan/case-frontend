import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const locales = ['en', 'tr'] as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
}

export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation({ locales })
