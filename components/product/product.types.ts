import { CurrencyProps } from '@/store/features/currency/currency.types'

export interface ProductImageProps {
  altTag: string
  src: string
}

export interface ProductProps {
  id: number
  name: string
  description: string
  slug: string
  price: CurrencyProps
  discountPrice?: string
  currency: CurrencyProps
  images: ProductImageProps[]
  product: {
    id: number
  }
}

export interface ProductForm {
  id: number
}

export interface ProductImageDto {
  src: string
  altTag: string
}

export interface ProductCurrencyDto {
  currency: string
  price: number | string
}

export interface ProductInfoDto {
  language: string
  name: string
  description: string
  slug: string
}

export type ProductImageForm = ProductImageDto & ProductForm
export type ProductCurrencyForm = ProductCurrencyDto & ProductForm
export type ProductInfoForm = ProductInfoDto & ProductForm
