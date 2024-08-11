export type CurrencyProps = 'tl' | 'euro' | 'dollar'

export const currencySymbols: Record<CurrencyProps, string> = {
  dollar: '$',
  tl: '₺',
  euro: '€',
}

export interface CurrencyState {
  currency: CurrencyProps | undefined
}
