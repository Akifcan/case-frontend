import { useState } from 'react'
import Dialog from '../dialog/dialog'
import { useUser } from '@/hooks/user.hook'
import fetcher from '@/store/fetcher'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/store/redux.provider'
import { useTranslations } from 'next-intl'

export default function EmptyBasket() {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const { visitorId } = useUser()
  const t = useTranslations()

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await fetcher<{ message: string; empty: false }>(`/basket/empty`, {
        method: 'DELETE',
        body: {
          visitorId,
        },
      })
    },
    onSuccess: (data) => {
      toast(data.message, { position: 'top-right' })
      if (data.empty) {
        Promise.allSettled([
          queryClient.fetchQuery({ queryKey: ['basket'] }),
          queryClient.fetchQuery({ queryKey: ['total-basket-item'] }),
        ])
      }
    },
    onError: () => {
      toast(t('common.error'), { position: 'top-right' })
    },
  })

  const handleClose = (confirmed: boolean) => {
    setDeleteDialogOpen(false)
    if (!confirmed) {
      return
    }
    mutate()
  }

  return (
    <>
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={handleClose}
        title={t('basket.confirmRemove')}
        subtitle={t('basket.confirmRemoveDesc')}
      />
      <button
        disabled={isPending}
        className="p-half"
        onClick={() => {
          setDeleteDialogOpen(true)
        }}
      >
        {t('basket.emptyButton')}
      </button>
    </>
  )
}
