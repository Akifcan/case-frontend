export interface ProductProps {
  id: number
  name: string
  description: string
  slug: string
  price: string
  discountPrice?: string
  currency: string
  images: {
    altTag: string
    src: string
  }[]
}
