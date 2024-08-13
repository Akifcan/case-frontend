import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import fetcher from '@/store/fetcher'
import { useMutation } from '@tanstack/react-query'
import type { UpdateForm } from './profile.types'
import { useUser } from '@/hooks/user.hook'
import toast from 'react-hot-toast'
import { queryClient } from '@/store/redux.provider'
import { useTranslations } from 'next-intl'

export default function UpdateForm() {
  const t = useTranslations()

  const UpdateSchema = Yup.object().shape({
    name: Yup.string().required('Required').max(100, 'max 100 character'),
  })
  const { user } = useUser()
  const { mutate, isPending } = useMutation({
    mutationFn: async (form: UpdateForm) => {
      return await fetcher<{ message: string }>(`/user`, {
        method: 'PATCH',
        body: {
          name: form.name,
        },
      })
    },
    onSuccess: (data) => {
      queryClient.fetchQuery({ queryKey: ['auth'] })
      toast(data.message, { position: 'top-right' })
    },
  })

  return (
    <>
      <Formik
        initialValues={{
          name: user?.name ?? '',
        }}
        validationSchema={UpdateSchema}
        onSubmit={(values) => {
          mutate({ name: values.name })
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex column mt-2">
            <h1>{t('profile.updateTitle')}</h1>
            {isPending && <p>{t('profile.wait')}</p>}
            <Field name="name" type="text" placeholder={t('auth.namePlaceholder')} className="p-half" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <button disabled={isPending} type="submit" className="p-half m-h30">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}
