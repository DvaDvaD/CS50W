'use client'
import Input from '@/components/formik/Input'
import { useAuth } from '@/context/AuthContext'
import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

const initialValues = { username: '' }
const validationSchema = Yup.object({
  username: Yup.string().required('Required'),
})

const ChangeUsername = () => {
  const { changeUsername, error, loading } = useAuth()

  const onSubmit = values => {
    changeUsername(values)
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <Form className="w-full sm:mx-4 sm:w-[25rem] lg:mx-0 lg:p-8">
        <p className="mb-4 text-2xl">Change Username</p>
        {error && (
          <div className="mb-2 w-full rounded-lg border-2 border-red-500 bg-red-50 py-1.5 text-center text-red-500">
            {error}
          </div>
        )}
        <Input
          name="username"
          label="New username"
          placeholder="Enter your new username"
        />
        <button
          type="submit"
          disabled={loading}
          className="text-background bg-primary disabled:bg-text/10 rounded-lg px-12 py-1.5 text-center"
        >
          Save
        </button>
      </Form>
    </Formik>
  )
}

export default ChangeUsername
