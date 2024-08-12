export interface BasketProps {
  product: {
    id: number
    name: string
    slug: string
  }
  basket: {
    id: number
    visitorId: number
    quantity: number
    product: {
      id: number
    }
  }
  image: {
    id: number
    altTag: string
    src: string
  }
  pricing: {
    unitPrice: string
    totalPrice: number
    price: string
    discountPrice?: string
    labels: {
      totalPrice: string
      unitPrice: string
    }
  }
}

export interface PricingProps {
  totalPrice: number
  label: string
}
