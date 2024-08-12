import { useState } from 'react'
import DeleteIcon from '../icons/delete.icon'
import Dialog from '@/components/dialog/dialog'
import { ProductProps } from '@/components/product/product.types'
import { useMutation } from '@tanstack/react-query'
import fetcher from '@/store/fetcher'
import toast from 'react-hot-toast'

export default function DeleteProductButton({ product }: Readonly<{ product: ProductProps }>) {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isProductDeleted, setProductDeleted] = useState(false)

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
      toast('Beklenmedik bir hata oluştu', { position: 'top-right' })
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
        title="Ürünü Sil?"
        subtitle="Bu işlemi geri alabilirsiniz"
      />
      <button
        disabled={isPending}
        onClick={() => setDeleteDialogOpen(true)}
        className="p-half flex row align-items-center justify-content-center"
      >
        <DeleteIcon /> {!isProductDeleted ? 'Remove this product' : 'Reactive Product'}
      </button>
    </>
  )
}
