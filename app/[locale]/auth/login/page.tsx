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
import { useTranslations } from 'next-intl'

export default function Login() {
  const router = useRouter()
  const t = useTranslations()

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('validation.mail'))
      .required(t('validation.required'))
      .max(100, t('validation.maxChar', { max: 100 })),
    password: Yup.string()
      .required(t('validation.required'))
      .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, t('validation.password'))
      .max(100, t('validation.maxChar', { max: 100 })),
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
          <h1>{t('auth.loginTitle')}</h1>
          {isPending && <p>{t('wait')}</p>}
          {data?.error_code && <Alert type="info" message={data.message || 'Error'} />}
          <Field
            name="email"
            type="email"
            placeholder={t('auth.emailPlaceholder')}
            className="p-half"
            data-testid="login-email-input"
          />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field
            name="password"
            type="password"
            placeholder={t('auth.passwordPlaceholder')}
            className="p-half"
            data-testid="login-password-input"
          />
          {errors.password && touched.password ? <div>{errors.password}</div> : null}
          <button
            disabled={isPending}
            type="submit"
            className="p-half m-h30"
            data-testid="login-submit-button"
          >
            {t('auth.submit')}
          </button>
          <Link href={'/auth/register'}>{t('auth.registerButton')}</Link>
        </Form>
      )}
    </Formik>
  )
}
