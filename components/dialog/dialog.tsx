import { useState } from 'react'
import styles from './dialog.module.css'
import { useTranslations } from 'next-intl'

export default function Dialog({
  title,
  subtitle,
  isOpen,
  onClose,
}: Readonly<{ title: string; subtitle: string; isOpen: boolean; onClose: (confirmed: boolean) => void }>) {
  const t = useTranslations('common')

  return isOpen ? (
    <dialog open className={[styles['dialog'], 'flex column'].join(' ')} style={{ gap: '.5rem' }}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <form method="dialog" className="flex wrap align-items-center">
        <button
          className={styles['confirm-button']}
          onClick={(e) => {
            e.stopPropagation()
            onClose(false)
          }}
        >
          {t('confirmButton')}
        </button>
        <button
          className={styles['cancel-button']}
          onClick={(e) => {
            e.stopPropagation()
            onClose(true)
          }}
        >
          {t('cancelButton')}
        </button>
      </form>
    </dialog>
  ) : null
}
