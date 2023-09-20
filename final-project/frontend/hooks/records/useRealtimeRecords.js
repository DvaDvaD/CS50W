import { useAuth } from '@/context/AuthContext'
import { baseURL } from '@/lib/fetch'
import React, { useEffect, useState } from 'react'

const useRealtimeRecords = () => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const { accounts, activeAccountIndex } = useAuth()

  useEffect(() => {
    const getRecords = async () => {
      if (accounts.length === 0) return
      const res = await fetch(
        baseURL +
          '/users/transactions/' +
          accounts[activeAccountIndex]?.id +
          '/',
        {
          cache: 'no-store',
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        },
      )
      const data = await res.json()
      setRecords(data)
    }

    getRecords()
    const intervalId = setInterval(() => {
      getRecords()
    }, 3000)

    return () => {
      clearInterval(intervalId)
    }
  }, [activeAccountIndex, accounts])

  return { records, loading }
}

export default useRealtimeRecords
