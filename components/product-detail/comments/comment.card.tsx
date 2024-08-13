import styles from './comment.module.css'
import { CommentProps } from './comment.types'

export default function CommentCard({ comment }: Readonly<{ comment: CommentProps }>) {
  return (
    <div className={[styles['comment-card'], 'flex column'].join(' ')}>
      <h4>
        {comment.user.name} - <time>{comment.createdAt}</time>{' '}
      </h4>
      <p>{comment.content}</p>
    </div>
  )
}
