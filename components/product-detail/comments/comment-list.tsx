import { useQuery } from '@tanstack/react-query'
import CommentCard from './comment.card'
import fetcher from '@/store/fetcher'
import { CommentProps } from './comment.types'
import Alert from '@/components/alert/alert'
import CreateComment from './create-comment'
import { useUser } from '@/hooks/user.hook'
import { useTranslations } from 'next-intl'

export default function CommentList({ productId }: Readonly<{ productId: number }>) {
  const { user } = useUser()
  const t = useTranslations()

  const { data, isLoading } = useQuery({
    queryKey: ['comment-list'],
    queryFn: async () => {
      return await fetcher<{ comments: CommentProps[]; totalCount: number; message?: string }>(
        `/comment/${productId}`,
        {
          method: 'GET',
        },
      )
    },
  })

  return !isLoading ? (
    <div className="mt-2 flex column">
      {data && (
        <>
          <h3>
            {t('comments.title')} ({data.totalCount}){' '}
          </h3>
          {user && <CreateComment productId={productId} />}
          <hr />
          {data?.comments?.length > 0 &&
            data?.comments?.map((comment) => <CommentCard comment={comment} key={comment.id} />)}

          {data?.totalCount === 0 && <Alert type="info" message={t('comments.noComment')} />}
          {data?.message && <Alert type="info" message={data.message} />}
        </>
      )}
    </div>
  ) : (
    <p>{t('comments.loading')}</p>
  )
}
