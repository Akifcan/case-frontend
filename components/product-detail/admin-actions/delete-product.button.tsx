import { useState } from 'react'
import DeleteIcon from '../icons/delete.icon'
import Dialog from '@/components/dialog/dialog'

export default function DeleteProductButton() {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleClose = (confirmed: boolean) => {}

  return (
    <>
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={handleClose}
        title="Ürünü Sil?"
        subtitle="Bu işlemi geri alabilirsiniz"
      />
      <button
        onClick={() => setDeleteDialogOpen(true)}
        className="p-half flex row align-items-center justify-content-center"
      >
        <DeleteIcon /> Remove this product
      </button>
    </>
  )
}
