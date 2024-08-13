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
import { useTranslations } from 'next-intl'

export default function Register() {
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
    name: Yup.string()
      .required('Required')
      .max(100, t('validation.maxChar', { max: 100 })),
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
          <h1>{t('auth.register')}</h1>
          {isPending && <p>Lütfen Bekleyin</p>}
          {data?.error_code && <Alert type="info" message={data.message || 'Error'} />}
          <Field
            name="name"
            type="text"
            placeholder={t('auth.namePlaceholder')}
            className="p-half"
            data-testid="register-name-input"
          />
          {errors.name && touched.name ? <div>{errors.name}</div> : null}
          <Field
            name="email"
            type="email"
            placeholder={t('auth.emailPlaceholder')}
            className="p-half"
            data-testid="register-email-input"
          />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field
            name="password"
            type="password"
            placeholder={t('auth.passwordPlaceholder')}
            className="p-half"
            data-testid="register-password-input"
          />
          {errors.password && touched.password ? <div>{errors.password}</div> : null}
          <button
            disabled={isPending}
            type="submit"
            className="p-half m-h30"
            data-testid="register-submit-button"
          >
            {t('auth.submit')}
          </button>
          <Link href={'/auth/login'}>{t('auth.loginButton')}</Link>
        </Form>
      )}
    </Formik>
  )
}
