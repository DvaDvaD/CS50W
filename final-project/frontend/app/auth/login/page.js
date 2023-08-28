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
    <main className="flex justify-center items-center h-screen">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form className="w-full mx-4 sm:w-[25rem] border-2 rounded-lg border-text/10 p-8">
          <p className="text-3xl text-center mb-4">Login</p>
          <Input name="email" label="Email" placeholder="youremail@email.com" />
          <Input
            name="password"
            label="Password"
            placeholder="Enter your password"
            password
          />
          <p className="font-normal text-sm -mt-3">
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
            className="font-normal hover:underline cursor-pointer w-fit text-sm text-accent mb-3"
          >
            Forget your password?
          </p>
          <button
            type="submit"
            className="text-background bg-primary rounded-lg text-center py-1.5 w-full"
          >
            Login
          </button>
        </Form>
      </Formik>
    </main>
  )
}

export default Login
