'use client'

import Input from '@/components/formik/Input'
import { useAuth } from '@/context/AuthContext'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup'

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmation: '',
}

const validationSchema = Yup.object({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().required('Required'),
  confirmation: Yup.string()
    .oneOf(['', Yup.ref('password')], 'Unequal password and confirmation')
    .required('Required'),
})

const Register = () => {
  const { error, loading, register } = useAuth()

  const onSubmit = values => {
    register(values)
  }
  return (
    <main className="flex h-screen items-center justify-center">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form className="border-text/10 mx-4 w-full rounded-lg sm:w-[25rem] sm:border-2 sm:p-8">
          <p className="mb-4 text-center text-3xl">Register</p>
          {error && (
            <div className="mb-2 w-full rounded-lg border-2 border-red-500 bg-red-50 py-1.5 text-center text-red-500">
              {error}
            </div>
          )}
          <Input
            name="username"
            label="Username"
            placeholder="Enter your username"
          />
          <Input name="email" label="Email" placeholder="youremail@email.com" />
          <Input
            name="password"
            label="Password"
            placeholder="Enter your password"
            password
          />
          <Input
            name="confirmation"
            label="Password confirmation"
            placeholder="Reenter your password"
            password
          />
          <p className="-mt-3 mb-3 text-sm font-normal">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-accent">
              Login
            </Link>
          </p>
          <button
            type="submit"
            disabled={loading}
            className="text-background bg-primary disabled:bg-text/10 w-full rounded-lg py-1.5 text-center"
          >
            Register
          </button>
        </Form>
      </Formik>
    </main>
  )
}

export default Register
