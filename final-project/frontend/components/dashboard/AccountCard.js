import { formatAsDollars } from '@/utils/formatAsDollars'
import React from 'react'

const AccountCard = ({ balance }) => {
  return (
    <div
      className={`bg-secondary border-accent w-32 cursor-pointer rounded-lg px-3 py-2 hover:border-2 sm:w-40 lg:w-48 lg:px-4`}
    >
      <p className="text-text/30 text-xs lg:text-base">Account</p>
      <p className="text-sm lg:text-base">{formatAsDollars(balance)}</p>
    </div>
  )
}

export default AccountCard
