import AddRecord from '@/components/add-record-button/AddRecord'
import AddRecordDesktop from '@/components/add-record-button/AddRecordDesktop'
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
    <div className="sm:mx-4 lg:mx-0 lg:flex lg:items-start lg:space-x-8 lg:p-8">
      <div className="flex-grow">
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
      </div>
      <div className="bg-text/[3%] hidden w-1/3 rounded-lg lg:block">
        <AddRecordDesktop />
      </div>
    </div>
  )
}

export default Records
