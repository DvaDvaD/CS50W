'use client'

import { validationSchema } from '@/components/add-record-button/AddRecord'
import AddRecordDesktop from '@/components/add-record-button/AddRecordDesktop'
import DateInput from '@/components/formik/DateInput'
import Input from '@/components/formik/Input'
import useRealtimeRecords from '@/hooks/records/useRealtimeRecords'
import { formatAsDollars } from '@/utils/formatAsDollars'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'

const Records = () => {
  const { records, loading } = useRealtimeRecords()
  const [modalState, setModalState] = useState(null)

  const handleClickRecord = data => {
    setModalState({ ...data, date: new Date(data.date) })
  }

  const handleClickBackdrop = () => {
    setModalState(null)
  }

  const onSubmit = values => {
    console.log(values)
  }

  const handleDelete = () => {
    console.log('delete')
  }

  return (
    <div className="sm:mx-4 lg:mx-0 lg:flex lg:items-start lg:space-x-8 lg:p-8">
      {modalState && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div
            onClick={handleClickBackdrop}
            className="absolute top-0 h-full w-full bg-black/50"
          ></div>
          <div className="bg-background z-10 mx-4 max-w-[25rem] whitespace-break-spaces rounded-lg p-8">
            <Formik
              validationSchema={validationSchema}
              initialValues={modalState}
              onSubmit={onSubmit}
            >
              <Form className="w-full">
                <p className="mb-4 text-center text-3xl">
                  Modify/Delete Record
                </p>
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
                  className="text-background bg-primary disabled:bg-text/10 mb-3 w-full rounded-lg py-1.5 text-center"
                >
                  Add Record
                </button>
                <button
                  type="button"
                  className="text-background disabled:bg-text/10 w-full rounded-lg bg-red-500 py-1.5 text-center"
                >
                  Delete Record
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
      <div className="!m-0 flex-grow">
        <h2 className="mb-4 text-2xl">Records</h2>
        {records.length === 0 ? (
          loading ? (
            <p>Fetching latest records...</p>
          ) : (
            <p>Create a new record to see the record list</p>
          )
        ) : (
          records
            .map((data, idx) => (
              <div
                key={idx}
                onClick={() => handleClickRecord(data)}
                className="hover:bg-text/[3%] border-text/10 flex cursor-pointer items-center justify-between border-t p-2 text-sm font-normal transition-all last:border-b"
              >
                <div>
                  <p>{data.description}</p>
                  <p className="text-text/50">
                    {new Date(data.date).toLocaleString()}
                  </p>
                  <p className="text-text/30">Account #{data.account[0]}</p>
                </div>
                <p
                  className={`font-bold ${
                    data.amount > 0
                      ? 'text-primary'
                      : data.amount < 0 && 'text-red-500'
                  }`}
                >
                  {formatAsDollars(data.amount)}
                </p>
              </div>
            ))
            .reverse()
        )}
      </div>
      <div className="bg-text/[3%] sticky top-8 hidden w-1/3 rounded-lg lg:block">
        <AddRecordDesktop />
      </div>
    </div>
  )
}

export default Records
