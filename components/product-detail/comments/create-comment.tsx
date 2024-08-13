import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { useMutation } from '@tanstack/react-query'
import fetcher from '@/store/fetcher'
import { CommentForm } from './comment.types'
import Alert from '@/components/alert/alert'
import toast from 'react-hot-toast'
import { queryClient } from '@/store/redux.provider'

export default function CreateComment({ productId }: Readonly<{ productId: number }>) {
  const CommentSchema = Yup.object().shape({
    comment: Yup.string().required('Required').max(100, 'max 100 character'),
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
      toast('Yorumunuz paylaşıldı', { position: 'top-right' })
      queryClient.fetchQuery({ queryKey: ['comment-list'] })
    },
  })

  return (
    <Formik
      initialValues={{
        comment: '',
      }}
      validationSchema={CommentSchema}
      onSubmit={(values) => {
        mutate(values)
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex column">
          <p>Share your comment</p>
          {isPending && <p>Lütfen Bekleyin</p>}
          {error && <Alert type="info" message={'Error'} />}
          <Field
            name="comment"
            type="text"
            placeholder="enter comment"
            className="p-half"
            data-testid="comment-input"
          />
          {errors.comment && touched.comment ? <div>{errors.comment}</div> : null}
          <button disabled={isPending} type="submit" className="p-half" data-testid="login-submit-button">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}
