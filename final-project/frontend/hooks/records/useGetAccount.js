import { baseURL } from '@/lib/fetch'
import React, { useState } from 'react'

const useGetAccount = id => {
  const [account, setAccount] = useState(null)

  const getAccount = async () => {
    const res = await fetch(baseURL + '/accounts/' + id, {
      cache: 'no-store',
    })
    const data = await res.json()
    setAccount(data)
  }

  return { account, getAccount }
}

export default useGetAccount
