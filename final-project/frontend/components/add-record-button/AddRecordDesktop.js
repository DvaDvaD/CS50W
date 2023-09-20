'use client'
import { Form, Formik } from 'formik'
import React from 'react'
import { initialValues, validationSchema } from './AddRecord'
import DateInput from '../formik/DateInput'
import Input from '../formik/Input'
import useRecords from '@/hooks/records/useRecords'
import { useAuth } from '@/context/AuthContext'

const AddRecordDesktop = () => {
  const { loading, postRecord } = useRecords()
  const { accounts, activeAccountIndex, setAccounts } = useAuth()
  const onSubmit = values => {
    postRecord({ ...values, account: [accounts[activeAccountIndex].id] })

    let newAccounts = [...accounts]
    newAccounts[activeAccountIndex].balance += values.amount
    setAccounts(newAccounts)
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <Form className="w-full p-8">
        <p className="mb-4 text-center text-3xl">Add Record</p>
        <Input
          name="amount"
          label="Amount"
          type="number"
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
