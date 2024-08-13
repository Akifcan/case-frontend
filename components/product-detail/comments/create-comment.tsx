import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { useMutation } from '@tanstack/react-query'
import fetcher from '@/store/fetcher'
import { CommentForm } from './comment.types'
import Alert from '@/components/alert/alert'
import toast from 'react-hot-toast'
import { queryClient } from '@/store/redux.provider'
import { useTranslations } from 'next-intl'

export default function CreateComment({ productId }: Readonly<{ productId: number }>) {
  const t = useTranslations()

  const CommentSchema = Yup.object().shape({
    comment: Yup.string()
      .required(t('validation.required'))
      .max(100, t('validation.maxChar', { max: 100 })),
  })

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: async ({ comment }: CommentForm) => {
      return await fetcher(`/comment/${productId}`, {
        method: 'POST',
        body: {
          comment,
        },
      })
    },
    onSuccess: () => {
      toast(t('comments.commentShared'), { position: 'top-right' })
      queryClient.fetchQuery({ queryKey: ['comment-list'] })
    },
  })

  return (
    <Formik
      initialValues={{
        comment: '',
      }}
      validationSchema={CommentSchema}
      onSubmit={(values, { resetForm }) => {
        mutate(values)
        resetForm()
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex column">
          <p>{t('comments.newCommentTitle')}</p>
          {isPending && <p>{t('comments.pleaseWait')}</p>}
          {error && <Alert type="info" message={t('common.error')} />}
          <Field
            name="comment"
            type="text"
            placeholder={t('comments.enterCommentPlaceholder')}
            className="p-half"
            data-testid="comment-input"
          />
          {errors.comment && touched.comment ? <div>{errors.comment}</div> : null}
          <button disabled={isPending} type="submit" className="p-half" data-testid="login-submit-button">
            {!isPending ? t('comments.submit') : t('comments.pleaseWait')}
          </button>
        </Form>
      )}
    </Formik>
  )
}
