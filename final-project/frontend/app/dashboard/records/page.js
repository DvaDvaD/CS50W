import AddRecord from '@/components/add-record-button/AddRecord'
import { formatAsDollars } from '@/utils/formatAsDollars'
import React from 'react'

const dummyData = [
  {
    amount: 100,
    date: new Date(),
    account: 'Mine',
    description: 'Test transaction',
  },
  {
    amount: 100,
    date: new Date(),
    account: 'Mine',
    description: 'Test transaction',
  },
  {
    amount: 100,
    date: new Date(),
    account: 'Mine',
    description: 'Test transaction',
  },
  {
    amount: 100,
    date: new Date(),
    account: 'Mine',
    description: 'Test transaction',
  },
]

const Records = () => {
  return (
    <main className="mx-4 mb-8">
      <h2 className="mb-4 text-2xl">Records</h2>
      {dummyData.map(data => (
        <div
          key={data.date}
          className="hover:bg-text/[3%] border-text/10 flex cursor-pointer items-center justify-between border-t p-2 text-sm font-normal transition-all last:border-b"
        >
          <div>
            <p>{data.description}</p>
            <p className="text-text/50">{data.date.toLocaleString()}</p>
            <p className="text-text/30">{data.account}</p>
          </div>
          <p className="font-bold">{formatAsDollars(data.amount)}</p>
        </div>
      ))}
    </main>
  )
}

export default Records
