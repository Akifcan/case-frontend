'use client'
import Alert from '@/components/alert/alert'
import BasketCard from '@/components/basket/basket.card'
import { BasketProps, PricingProps } from '@/components/basket/basket.types'
import { useUser } from '@/hooks/user.hook'
import fetcher from '@/store/fetcher'
import { useAppSelector } from '@/store/hooks'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export default function Basket() {
  const currency = useAppSelector((state) => state.currency.currency)
  const { currency: userCurrency, visitorId } = useUser()
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['basket'],
    queryFn: async () => {
      return await fetcher<{ basket: BasketProps[]; pricing: PricingProps }>('/basket', {
        method: 'POST',
        body: {
          visitorId,
          currency: userCurrency,
        },
      })
    },
  })

  useEffect(() => {
    refetch()
  }, [currency])

  return (
    <div className={'flex column mt-2'}>
      {error && <Alert type="error" message="Beklenmedik bir hata oluştu lütfen tekrar deneyin" />}
      {isLoading && <p>Ürünler yükleniyor...</p>}
      {data && data.basket && (
        <>
          {data.basket.map((basket, index) => (
            <BasketCard key={index} basket={basket} />
          ))}
          <h4>Toplam Fiyat: {data.pricing.label}</h4>
        </>
      )}
    </div>
  )
}
