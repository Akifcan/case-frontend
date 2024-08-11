'use client'
import styles from './header.module.css'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { ChangeEvent, useEffect } from 'react'
import { setCurrency } from '@/store/features/currency/currency.slice'
import { CurrencyProps } from '@/store/features/currency/currency.types'
import Cookies from 'js-cookie'

export default function Currency() {
  const currency = useAppSelector((state) => state.currency.currency)
  const dispatch = useAppDispatch()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value as CurrencyProps
    dispatch(setCurrency(newCurrency))
    Cookies.set('APP_CURRENCY', newCurrency)
  }

  const handleCurrentCurrency = () => {
    const currentCurrency = Cookies.get('APP_CURRENCY') as CurrencyProps
    if (!currentCurrency) {
      return
    }
    dispatch(setCurrency(currentCurrency))
  }

  useEffect(handleCurrentCurrency, [])

  return (
    <select value={currency} onChange={handleChange} className={styles['currency']}>
      <option value={'tl'}>₺</option>
      <option value={'euro'}>€</option>
      <option value={'dollar'}>$</option>
    </select>
  )
}
