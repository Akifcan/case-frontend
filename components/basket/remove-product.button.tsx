import { useState } from 'react'
import Dialog from '../dialog/dialog'
import RemoveIcon from './icons/remove.icon'
import { useMutation } from '@tanstack/react-query'
import fetcher from '@/store/fetcher'
import { queryClient } from '@/store/redux.provider'
import { useUser } from '@/hooks/user.hook'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'

export default function RemoveProductButton({ productId }: Readonly<{ productId: number }>) {
  const [isOpen, setOpen] = useState(false)
  const { currency, visitorId } = useUser()
  const t = useTranslations()

  const { mutate, isPending } = useMutation({
    mutationFn: async (productId: number) => {
      return await fetcher<{ message: string }>(`/basket/${productId}`, {
        method: 'DELETE',
        body: {
          currency,
          visitorId,
        },
      })
    },
    onSuccess: (data) => {
      queryClient.fetchQuery({ queryKey: ['basket'] })
      toast(data.message, { position: 'top-right' })
    },
  })

  const handleConfirm = (confirmed: boolean) => {
    setOpen(false)
    if (confirmed) {
      mutate(productId)
    }
  }

  return (
    <>
      <Dialog
        title={t('basket.confirmProduct')}
        subtitle={t('basket.confirmProductDesc')}
        isOpen={isOpen}
        onClose={handleConfirm}
      />
      <button
        disabled={isPending}
        onClick={(e) => {
          e.stopPropagation()
          setOpen(true)
        }}
        aria-label={t('basket.confirmAria')}
        className="ml-auto align-self-center ghost-button cursor-pointer"
      >
        <RemoveIcon />
      </button>
    </>
  )
}
