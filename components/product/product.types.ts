import { CurrencyProps } from '@/store/features/currency/currency.types'

export interface ProductProps {
  id: number
  name: string
  description: string
  slug: string
  price: CurrencyProps
  discountPrice?: string
  currency: CurrencyProps
  images: {
    altTag: string
    src: string
  }[]
}
