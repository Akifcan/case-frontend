import { useState } from 'react'
import Dialog from '../dialog/dialog'
import { useUser } from '@/hooks/user.hook'
import fetcher from '@/store/fetcher'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/store/redux.provider'

export default function EmptyBasket() {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const { visitorId } = useUser()

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
        queryClient.fetchQuery({ queryKey: ['basket'] })
      }
    },
    onError: () => {
      toast('Beklenmedik bir hata oluştu', { position: 'top-right' })
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
        title="Sepeti temizle"
        subtitle="tüm sepeti temizlemek istiyor musunuz?"
      />
      <button
        disabled={isPending}
        className="p-half"
        onClick={() => {
          setDeleteDialogOpen(true)
        }}
      >
        Empty this basket
      </button>
    </>
  )
}
