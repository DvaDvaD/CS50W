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

const Register = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form className="border-text/10 mx-4 w-full rounded-lg border-2 p-8 sm:w-[25rem]">
          <p className="mb-4 text-center text-3xl">Register</p>
          <Input name="email" label="Email" placeholder="youremail@email.com" />
          <Input
            name="password"
            label="Password"
            placeholder="Enter your password"
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
            className="text-background bg-primary w-full rounded-lg py-1.5 text-center"
          >
            Login
          </button>
        </Form>
      </Formik>
    </main>
  )
}

export default Register
