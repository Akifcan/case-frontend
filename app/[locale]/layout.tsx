import type { Metadata } from 'next'
import '@/styles/globals.css'
import ReduxProvider from '@/store/redux.provider'
import Header from '@/components/header/header'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Generated by create next app',
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = await getMessages()

  return (
    <ReduxProvider>
      <html lang={locale}>
        <body className="container">
          <NextIntlClientProvider messages={messages}>
            <Header />
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </ReduxProvider>
  )
}
