'use client'

import Input from '@/components/formik/Input'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup'

const initialValues = {
  email: '',
  password: '',
}

const onSubmit = values => {
  console.log(values)
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().required('Required'),
})

const Login = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form className="border-text/10 mx-4 w-full rounded-lg border-2 p-8 sm:w-[25rem]">
          <p className="mb-4 text-center text-3xl">Login</p>
          <Input name="email" label="Email" placeholder="youremail@email.com" />
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
            title="Please fill in the e-mail field to receive the password recovery email"
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
