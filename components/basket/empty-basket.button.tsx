import { useState } from 'react'
import Dialog from '../dialog/dialog'

export default function EmptyBasket() {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleClose = (confirmed: boolean) => {
    setDeleteDialogOpen(false)
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
