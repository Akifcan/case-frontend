'use client'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { Link, useRouter } from '@/i18n.config'
import { useMutation } from '@tanstack/react-query'
import fetcher from '@/store/fetcher'
import Alert from '@/components/alert/alert'
import Cookies from 'js-cookie'
import { LoginForm } from '@/components/auth/auth.types'
import { queryClient } from '@/store/redux.provider'

export default function Login() {
  const router = useRouter()

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required').max(100, 'max 100 character'),
    password: Yup.string()
      .required('Required')
      .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Wrong password regex')
      .max(100, 'max 100 character'),
  })

  const { mutate, isPending, data } = useMutation({
    mutationFn: async ({ email, password }: LoginForm) => {
      return await fetcher<{ accessToken: string; error_code?: string; message?: string }>(`/auth/login`, {
        method: 'POST',
        body: {
          email,
          password,
        },
      })
    },
    onSuccess: (data) => {
      if (!data.accessToken) {
        return
      }
      Cookies.set('AUTH_TOKEN', data.accessToken)
      queryClient.fetchQuery({ queryKey: ['auth'] })
      router.push('/')
    },
  })

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        mutate(values)
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex column mt-2">
          <h1>Login</h1>
          {isPending && <p>Lütfen Bekleyin</p>}
          {data?.error_code && <Alert type="info" message={data.message || 'Error'} />}
          <Field name="email" type="email" placeholder="enter email" className="p-half" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field name="password" type="password" placeholder="enter password" className="p-half" />
          {errors.password && touched.password ? <div>{errors.password}</div> : null}
          <button disabled={isPending} type="submit" className="p-half">
            Submit
          </button>
          <Link href={'/auth/register'}>Click for register</Link>
        </Form>
      )}
    </Formik>
  )
}
