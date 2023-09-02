import { formatAsDollars } from '@/utils/formatAsDollars'
import React from 'react'

const AccountCard = ({ balance }) => {
  return (
    <div
      className={`bg-secondary border-accent w-40 cursor-pointer rounded-lg px-3 py-2 hover:border-2`}
    >
      <p className="text-text/30 text-xs">Account</p>
      <p className="text-sm">{formatAsDollars(balance)}</p>
    </div>
  )
}

export default AccountCard
