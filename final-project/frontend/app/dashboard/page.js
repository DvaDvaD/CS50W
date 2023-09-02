import AccountCard from '@/components/dashboard/AccountCard'
import React from 'react'

const dummyData = [
  {
    balance: 500,
  },
  {
    balance: 500,
  },
]

const Dashboard = async () => {
  return (
    <main className="mx-4 mb-8">
      <div className="mb-8 flex flex-wrap gap-4">
        {dummyData.map((data, idx) => (
          <AccountCard key={idx} balance={data.balance} />
        ))}
        <div className="border-text hover:border-accent text-accent w-40 cursor-pointer rounded-lg border-2 border-dashed p-3 text-center text-sm opacity-10 transition-all hover:opacity-100">
          + Add Account
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {[1, 2, 3, 4].map((_, idx) => (
          <div key={idx} className="bg-text/[3%] h-60 w-full rounded-lg"></div>
        ))}
      </div>
    </main>
  )
}

export default Dashboard
