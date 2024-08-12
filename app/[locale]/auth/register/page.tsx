'use client'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { Link } from '@/i18n.config'

export default function Register() {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required').max(100, 'max 100 character'),
    password: Yup.string().required('Required').max(100, 'max 100 character'),
    name: Yup.string().required('Required').max(100, 'max 100 character'),
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
        // same shape as initial values
        console.log(values)
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex column mt-2">
          <h1>Register</h1>
          <Field name="name" type="text" placeholder="enter name" className="p-half" />
          {errors.name && touched.name ? <div>{errors.name}</div> : null}
          <Field name="email" type="email" placeholder="enter email" className="p-half" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field name="password" type="password" placeholder="enter password" className="p-half" />
          {errors.password && touched.password ? <div>{errors.password}</div> : null}
          <button type="submit" className="p-half">
            Submit
          </button>
          <Link href={'/auth/login'}>Click for login</Link>
        </Form>
      )}
    </Formik>
  )
}
