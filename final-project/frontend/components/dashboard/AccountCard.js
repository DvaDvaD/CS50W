import { useAuth } from '@/context/AuthContext'
import { formatAsDollars } from '@/utils/formatAsDollars'
import React from 'react'

const AccountCard = ({ data, onClick, idx }) => {
  const { activeAccountIndex } = useAuth()

  return (
    <div
      onClick={onClick}
      className={`${
        activeAccountIndex === idx && '!border-accent'
      } bg-secondary border-secondary hover:border-accent w-32 cursor-pointer rounded-lg border-2 px-3 py-2 transition-all sm:w-40 lg:w-48 lg:px-4`}
    >
      <p className="text-text/30 text-xs lg:text-base">Account #{data.id}</p>
      <p className="text-sm lg:text-base">{formatAsDollars(data.balance)}</p>
    </div>
  )
}

export default AccountCard
