'use client'
import AccountCard from '@/components/dashboard/AccountCard'
import React, { useState } from 'react'
import AddRecordDesktop from '@/components/add-record-button/AddRecordDesktop'
import { useAuth } from '@/context/AuthContext'
import useAddAccount from '@/hooks/records/useAddAccount'
import { formatAsDollars } from '@/utils/formatAsDollars'
import useRealtimeRecords from '@/hooks/records/useRealtimeRecords'
import useRealtimeDebts from '@/hooks/records/useRealtimeDebts'
import { baseURL } from '@/lib/fetch'
import useDebts from '@/hooks/records/useDebts'
import { Form, Formik } from 'formik'
import Input from '@/components/formik/Input'
import DateInput from '@/components/formik/DateInput'
import {
  initialValues,
  validationSchema,
} from '@/components/add-record-button/AddRecord'

const Dashboard = () => {
  const {
    accounts,
    setAccounts,
    activeAccountIndex,
    debts,
    setActiveAccountIndex,
  } = useAuth()
  const { addAccount } = useAddAccount()
  const { records } = useRealtimeRecords()
  const [modalState, setModalState] = useState(null)
  const [formModalState, setFormModalState] = useState(null)
  useRealtimeDebts()
  const { postPerson, deletePerson, putDebt } = useDebts()

  const handleClickRecord = data => {
    setModalState({ ...data, date: new Date(data.date) })
  }

  const handleClickBackdrop = () => {
    setModalState(null)
    setFormModalState(null)
  }

  const handleDelete = async () => {
    const res = await fetch(baseURL + '/transactions/' + modalState.id + '/', {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
    setAccounts(prev => {
      let newAccounts = [...prev]
      newAccounts[activeAccountIndex].balance -= modalState.amount
      return newAccounts
    })
    setModalState(null)
  }

  const onSubmit = (values, { resetForm }) => {
    putDebt(
      { ...values, account: [accounts[activeAccountIndex].id] },
      formModalState,
    )

    let newAccounts = [...accounts]
    newAccounts[activeAccountIndex].balance += values.amount
    setAccounts(newAccounts)
    resetForm()
    setFormModalState(null)
  }

  return (
    <div className="lg:flex lg:items-start lg:space-x-8 lg:p-8">
      {modalState && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div
            onClick={handleClickBackdrop}
            className="absolute top-0 h-full w-full bg-black/50"
          ></div>
          <div className="bg-background border-text/10 z-10 mx-4 max-w-[25rem] whitespace-break-spaces rounded-lg border-2 p-8">
            <p className="text-2xl">
              Are you sure you want to delete this record?
            </p>
            <div className="my-4 font-normal">
              <p>
                <b>Description:</b> {modalState.description}
              </p>
              <p>
                <b>Account:</b> #{modalState.account[0]}
              </p>
              <p>
                <b>Amount:</b> {formatAsDollars(modalState.amount)}
              </p>
              <p>
                <b>Date:</b> {new Date(modalState.date).toLocaleString()}
              </p>
            </div>
            <button
              type="button"
              onClick={handleDelete}
              className="text-background disabled:bg-text/10 w-full rounded-lg bg-red-500 px-6 py-1.5 text-center"
            >
              Delete Record
            </button>
          </div>
        </div>
      )}
      {formModalState && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div
            onClick={handleClickBackdrop}
            className="absolute top-0 h-full w-full bg-black/50"
          ></div>
          <div className="bg-background border-text/10 z-10 mx-4 w-full max-w-[25rem] whitespace-break-spaces rounded-lg border-2 p-8 sm:w-[25rem]">
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
              <Form className="w-full">
                <p className="mb-4 text-center text-3xl">Add Debt</p>
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
                  className="text-background bg-primary disabled:bg-text/10 w-full rounded-lg py-1.5 text-center"
                >
                  Add Debt
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
      <div className="lg:!ml-0 lg:flex lg:w-2/3 lg:flex-col">
        <div className="mb-8 flex flex-wrap gap-4">
          {accounts.map((data, idx) => (
            <AccountCard
              onClick={() => setActiveAccountIndex(idx)}
              idx={idx}
              key={idx}
              data={data}
            />
          ))}
          <div
            onClick={addAccount}
            className="border-text hover:border-accent text-accent flex w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-3 text-center text-sm opacity-10 transition-all hover:opacity-100 sm:w-40 lg:w-48 lg:p-4 lg:text-base"
          >
            <p>+ Add Account</p>
          </div>
        </div>

        <div className="flex flex-grow flex-wrap justify-center gap-4">
          <div className="bg-text/[3%] flex h-80 w-full flex-col rounded-lg p-4 md:w-[calc(50%-0.5rem)]">
            <p className="text-xl">Total Balance</p>
            <hr className="border-text/[50%] my-2" />
            <div className="flex h-full items-center justify-center">
              <p className="text-4xl xl:text-5xl">
                {formatAsDollars(
                  accounts.reduce((acc, current) => acc + current.balance, 0),
                )}
              </p>
            </div>
          </div>
          <div className="bg-text/[3%] flex h-80 w-full flex-col rounded-lg p-4 md:w-[calc(50%-0.5rem)]">
            <p className="text-xl">Recent records overview</p>
            <hr className="border-text/[50%] my-2" />
            <div className="h-full overflow-y-scroll px-2">
              {records
                .slice(0, 10)
                .map(record => (
                  <div
                    key={record.id}
                    onClick={() => handleClickRecord(record)}
                    className="hover:bg-text/[3%] border-text/10 cursor-pointer border-t p-2 text-sm font-normal transition-all last:border-b"
                  >
                    <p className="font-semibold">{record.description}</p>
                    <p className="text-text/50">
                      {new Date(record.date).toLocaleString()}
                    </p>
                    <p
                      className={`font-bold ${
                        record.amount > 0
                          ? 'text-primary'
                          : record.amount < 0 && 'text-red-500'
                      }`}
                    >
                      {formatAsDollars(record.amount)}
                    </p>
                  </div>
                ))
                .reverse()}
            </div>
          </div>
          <div className="bg-text/[3%] flex h-[30rem] w-full flex-col rounded-lg p-4">
            <p className="text-xl">Debts</p>
            <hr className="border-text/[50%] my-2" />
            <div className="h-full overflow-y-scroll px-2 pb-6">
              {debts.length === 0 ? (
                <div className="flex items-center justify-center">
                  <div>
                    <p className="mt-16 text-center text-2xl md:text-3xl xl:text-4xl">
                      You currently have no debts
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {debts.map((debt, idx) => (
                    <div key={idx} className="mb-4">
                      <div className="flex justify-between">
                        <p className="font-semibold">{debt.name}</p>
                        <p
                          className={`font-semibold ${
                            debt.transactions.reduce(
                              (acc, current) => acc + current.amount,
                              0,
                            ) > 0
                              ? 'text-red-500'
                              : debt.transactions.reduce(
                                  (acc, current) => acc + current.amount,
                                  0,
                                ) < 0 && 'text-primary'
                          }`}
                        >
                          {debt.transactions?.length !== 0 &&
                            formatAsDollars(
                              debt.transactions.reduce(
                                (acc, current) => acc + current.amount,
                                0,
                              ) * -1,
                            )}
                        </p>
                      </div>
                      <hr className="border-text/[30%] my-1" />
                      {debt.transactions && debt.transactions?.length !== 0 ? (
                        <>
                          {debt.transactions
                            .map(debt => (
                              <div
                                key={debt.id}
                                onClick={() => handleClickRecord(debt)}
                                className="hover:bg-text/[3%] border-text/10 cursor-pointer border-t p-2 text-sm font-normal transition-all last:border-b"
                              >
                                <p className="font-semibold">
                                  {debt.description}
                                </p>
                                <p className="text-text/50">
                                  {new Date(debt.date).toLocaleString()}
                                </p>
                                <p
                                  className={`font-bold ${
                                    debt.amount > 0
                                      ? 'text-primary'
                                      : debt.amount < 0 && 'text-red-500'
                                  }`}
                                >
                                  {formatAsDollars(debt.amount)}
                                </p>
                              </div>
                            ))
                            .reverse()}
                          <p className="mb-3 mt-4 text-center font-normal">
                            Add debt to {debt.name}?
                          </p>
                          <button
                            type="button"
                            onClick={() => setFormModalState(debt)}
                            className="text-background bg-primary disabled:bg-text/10 mx-auto mb-6 block rounded-lg px-8 py-1.5 text-center font-bold"
                          >
                            Add Debt
                          </button>
                        </>
                      ) : (
                        <div className="flex h-80 items-center justify-center font-normal">
                          <div>
                            <p className="mb-3">
                              Add new transaction to {debt.name}'s debt
                            </p>
                            <div className="space-y-4">
                              <button
                                type="button"
                                onClick={() => setFormModalState(debt)}
                                className="text-background bg-primary disabled:bg-text/10 mx-auto block rounded-lg px-8 py-1.5 text-center font-bold"
                              >
                                Add Debt
                              </button>
                              <button
                                type="button"
                                onClick={() => deletePerson(debt)}
                                className="text-background disabled:bg-text/10 mx-auto block rounded-lg bg-red-500 px-8 py-1.5 text-center font-bold"
                              >
                                Remove {debt.name}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
              {debts.length !== 0 && <hr className="border-text/[30%] mb-10" />}
              <p className="mb-3 text-center font-normal">
                Add more person to this list?
              </p>
              <button
                type="button"
                onClick={() => postPerson(prompt('Enter name:'))}
                className="text-background bg-primary disabled:bg-text/10 mx-auto block rounded-lg px-8 py-1.5 text-center font-bold"
              >
                Add Person
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-text/[3%] sticky top-8 hidden w-1/3 rounded-lg lg:block">
        <AddRecordDesktop />
      </div>
    </div>
  )
}

export default Dashboard
