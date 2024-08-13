import { useQuery } from '@tanstack/react-query'
import CommentCard from './comment.card'
import fetcher from '@/store/fetcher'
import { CommentProps } from './comment.types'
import Alert from '@/components/alert/alert'

export default function CommentList({ productId }: Readonly<{ productId: number }>) {
  const { data } = useQuery({
    queryKey: ['comment-list'],
    queryFn: async () => {
      return await fetcher<{ comments: CommentProps[]; totalCount: number }>(`/comment/${productId}`, {
        method: 'GET',
      })
    },
  })

  return data ? (
    <div className="mt-2 flex column">
      <h3>Yorumlar ({data.totalCount}) </h3>
      <hr className="mt-1" />
      {data.comments.length > 0 ? (
        data.comments.map((comment) => <CommentCard comment={comment} key={comment.id} />)
      ) : (
        <Alert type="info" message="Henüz bir yorum yok" />
      )}
    </div>
  ) : (
    <p>Yorumlar yükleniyor...</p>
  )
}
