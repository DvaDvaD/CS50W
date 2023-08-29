'use client'

import Input from '@/components/formik/Input'
import { useAuth } from '@/context/AuthContext'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = Yup.object({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

const Login = () => {
  const { login } = useAuth()

  const onSubmit = values => {
    login(values)
  }
  return (
    <main className="flex h-screen items-center justify-center">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form className="border-text/10 mx-4 w-full rounded-lg sm:w-[25rem] sm:border-2 sm:p-8">
          <p className="mb-4 text-center text-3xl">Login</p>
          <Input
            name="username"
            label="Username"
            placeholder="Enter your username"
          />
          <Input
            name="password"
            label="Password"
            placeholder="Enter your password"
            password
          />
          <p className="-mt-3 text-sm font-normal">
            Don't have an account?{' '}
            <Link
              href={'/auth/register'}
              className="text-accent hover:underline"
            >
              Register
            </Link>
          </p>
          <p
            title="Please fill in the e-mail field to receive the password recovery username"
            className="text-accent mb-3 w-fit cursor-pointer text-sm font-normal hover:underline"
          >
            Forget your password?
          </p>
          <button
            type="submit"
            className="text-background bg-primary w-full rounded-lg py-1.5 text-center"
          >
            Login
          </button>
        </Form>
      </Formik>
    </main>
  )
}

export default Login
