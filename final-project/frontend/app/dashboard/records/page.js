'use client'

import AddRecordDesktop from '@/components/add-record-button/AddRecordDesktop'
import { useAuth } from '@/context/AuthContext'
import useRealtimeRecords from '@/hooks/records/useRealtimeRecords'
import { baseURL } from '@/lib/fetch'
import { formatAsDollars } from '@/utils/formatAsDollars'
import React, { useState } from 'react'

const Records = () => {
  const { records, loading } = useRealtimeRecords()
  const [modalState, setModalState] = useState(null)
  const { setAccounts, activeAccountIndex } = useAuth()

  const handleClickRecord = data => {
    setModalState({ ...data, date: new Date(data.date) })
  }

  const handleClickBackdrop = () => {
    setModalState(null)
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

  return (
    <div className="sm:mx-4 lg:mx-0 lg:flex lg:items-start lg:space-x-8 lg:p-8">
      {modalState && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div
            onClick={handleClickBackdrop}
            className="absolute top-0 h-full w-full bg-black/50"
          ></div>
          <div className="border-text/10 bg-background z-10 mx-4 max-w-[25rem] whitespace-break-spaces rounded-lg border-2 p-8">
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
