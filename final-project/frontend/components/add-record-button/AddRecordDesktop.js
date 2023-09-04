'use client'
import { Form, Formik } from 'formik'
import React from 'react'
import { initialValues, validationSchema } from './AddRecord'
import { useAuth } from '@/context/AuthContext'
import DateInput from '../formik/DateInput'
import Input from '../formik/Input'

const AddRecordDesktop = () => {
  const { error, loading, login } = useAuth()

  const onSubmit = values => {
    console.log(JSON.stringify(values))
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <Form className="w-full p-8">
        <p className="mb-4 text-center text-3xl">Add Record</p>
        {error && (
          <div className="mb-2 w-full rounded-lg border-2 border-red-500 bg-red-50 py-1.5 text-center text-red-500">
            {error}
          </div>
        )}
        <Input
          name="amount"
          label="Amount"
          type="number"
          min={0}
          step={0.01}
          placeholder="$0.00"
        />
        <Input
          name="description"
          label="Description"
          placeholder="Description"
        />
        <DateInput
          name="date"
          label="Date and time"
          placeholderText="Click to select date and time"
        />
        <button
          type="submit"
          disabled={loading}
          className="text-background bg-primary disabled:bg-text/10 w-full rounded-lg py-1.5 text-center"
        >
          Add Record
        </button>
      </Form>
    </Formik>
  )
}

export default AddRecordDesktop
