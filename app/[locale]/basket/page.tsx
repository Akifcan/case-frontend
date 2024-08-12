'use client'
import Alert from '@/components/alert/alert'
import BasketCard from '@/components/basket/basket.card'
import { BasketProps, PricingProps } from '@/components/basket/basket.types'
import { useUser } from '@/hooks/user.hook'
import fetcher from '@/store/fetcher'
import { useAppSelector } from '@/store/hooks'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

export default function Basket() {
  const currency = useAppSelector((state) => state.currency.currency)
  const t = useTranslations('basket')
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
      {error && <Alert type="error" message={t('error')} />}
      {isLoading && <p>{t('loading')}</p>}
      {data && data.basket && (
        <>
          {data.basket.length > 0 && (
            <>
              {data.basket.map((basket, index) => (
                <BasketCard key={index} basket={basket} />
              ))}
              <h4 data-testid="total-price-h4">
                {t('totalPrice')} {data.pricing.label}
              </h4>
            </>
          )}
          {!data.basket.length && <Alert type="info" message={t('emptyBasket')} />}
        </>
      )}
    </div>
  )
}
