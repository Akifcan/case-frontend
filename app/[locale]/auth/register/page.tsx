'use client'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { Link, useRouter } from '@/i18n.config'
import { useMutation } from '@tanstack/react-query'
import fetcher from '@/store/fetcher'
import Cookies from 'js-cookie'
import Alert from '@/components/alert/alert'
import { RegisterForm } from '@/components/auth/auth.types'
import { queryClient } from '@/store/redux.provider'

export default function Register() {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required').max(100, 'max 100 character'),
    password: Yup.string()
      .required('Required')
      .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Wrong password regex')
      .max(100, 'max 100 character'),
    name: Yup.string().required('Required').max(100, 'max 100 character'),
  })

  const router = useRouter()

  const { mutate, isPending, data } = useMutation({
    mutationFn: async ({ email, password, name }: RegisterForm) => {
      return await fetcher<{ accessToken: string; error_code?: string; message?: string }>(`/auth/register`, {
        method: 'POST',
        body: {
          email,
          password,
          name,
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
        name: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        mutate(values)
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex column mt-2">
          <h1>Register</h1>
          {isPending && <p>Lütfen Bekleyin</p>}
          {data?.error_code && <Alert type="info" message={data.message || 'Error'} />}
          <Field
            name="name"
            type="text"
            placeholder="enter name"
            className="p-half"
            data-testid="register-name-input"
          />
          {errors.name && touched.name ? <div>{errors.name}</div> : null}
          <Field
            name="email"
            type="email"
            placeholder="enter email"
            className="p-half"
            data-testid="register-email-input"
          />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field
            name="password"
            type="password"
            placeholder="enter password"
            className="p-half"
            data-testid="register-password-input"
          />
          {errors.password && touched.password ? <div>{errors.password}</div> : null}
          <button disabled={isPending} type="submit" className="p-half" data-testid="register-submit-button">
            Submit
          </button>
          <Link href={'/auth/login'}>Click for login</Link>
        </Form>
      )}
    </Formik>
  )
}
