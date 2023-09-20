'use client'
import AccountCard from '@/components/dashboard/AccountCard'
import React from 'react'
import AddRecordDesktop from '@/components/add-record-button/AddRecordDesktop'
import { useAuth } from '@/context/AuthContext'
import useAddAccount from '@/hooks/records/useAddAccount'
import { formatAsDollars } from '@/utils/formatAsDollars'
import useRealtimeRecords from '@/hooks/records/useRealtimeRecords'

const Dashboard = () => {
  const { accounts, setActiveAccountIndex } = useAuth()
  const { addAccount } = useAddAccount()
  const { records } = useRealtimeRecords()

  return (
    <div className="lg:flex lg:items-start lg:space-x-8 lg:p-8">
      <div className="lg:flex lg:w-2/3 lg:flex-col">
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
              <p className="text-5xl">
                {formatAsDollars(
                  accounts.reduce((acc, current) => acc + current.balance, 0),
                )}
              </p>
            </div>
          </div>
          <div className="bg-text/[3%] flex h-80 w-full flex-col rounded-lg p-4 md:w-[calc(50%-0.5rem)]">
            <p className="text-xl">Recent records overview</p>
            <hr className="border-text/[50%] my-2" />
            <div className="h-full overflow-y-scroll">
              {records.slice(0, 10).map(record => (
                <div
                  key={record.id}
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
              ))}
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
