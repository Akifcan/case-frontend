import { AlertType } from './alert.types'
import styles from './alert.module.css'

export default function Alert({
  type,
  message,
}: Readonly<{
  type: AlertType
  message: string
}>) {
  return (
    <div className={[styles.alert, type === 'info' ? styles.info : styles.error].join(' ')}>{message}</div>
  )
}
