import { useState } from 'react'
import DeleteIcon from '../icons/delete.icon'
import Dialog from '@/components/dialog/dialog'
import { ProductProps } from '@/components/product/product.types'
import { useMutation } from '@tanstack/react-query'
import fetcher from '@/store/fetcher'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'

export default function DeleteProductButton({ product }: Readonly<{ product: ProductProps }>) {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isProductDeleted, setProductDeleted] = useState(false)
  const t = useTranslations()

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await fetcher<{ message: string; empty: false }>(`/product/${product.product.id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: (data) => {
      toast(data.message, { position: 'top-right' })
      setProductDeleted((prev) => !prev)
    },
    onError: () => {
      toast(t('common.error'), { position: 'top-right' })
    },
  })

  const handleClose = (confirmed: boolean) => {
    setDeleteDialogOpen(false)
    if (confirmed) {
      mutate()
    }
  }

  return (
    <>
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={handleClose}
        title={t('admin.removeProductTitle')}
        subtitle={t('admin.removeProductSubtitle')}
      />
      <button
        disabled={isPending}
        onClick={() => setDeleteDialogOpen(true)}
        className="p-half flex row align-items-center justify-content-center"
      >
        <DeleteIcon /> {!isProductDeleted ? t('admin.removeButton') : t('admin.reactiveButton')}
      </button>
    </>
  )
}
