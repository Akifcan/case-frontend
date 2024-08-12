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
        title="Silme işlemini onayla"
        subtitle="Bu işlem geri alınabilir"
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
