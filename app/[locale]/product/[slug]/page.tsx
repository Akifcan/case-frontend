import type { Metadata, ResolvingMetadata } from 'next'
import ClientPage from './page-client'
import fetcher from '@/store/fetcher'
import { AlternateLinkDescriptor, Languages } from 'next/dist/lib/metadata/types/alternative-urls-types'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const response = await fetcher<{
    title: string
    links: Languages<string | URL | AlternateLinkDescriptor[] | null> | undefined
  }>(`/product/${params.slug}/meta`, { method: 'POST' })

  return {
    title: `${response.title} - Shop`,
    alternates: {
      languages: response.links,
    },
  }
}

export default function Product() {
  return (
    <>
      <ClientPage />
    </>
  )
}
