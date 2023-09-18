import { useAuth } from '@/context/AuthContext'
import { baseURL } from '@/lib/fetch'
import React, { useEffect, useState } from 'react'

const useRealtimeRecords = () => {
  const [records, setRecords] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    const getRecords = async () => {
      const res = await fetch(baseURL + '/transactions/', {
        cache: 'no-store',
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      const data = await res.json()
      setRecords(data)
    }

    const intervalId = setInterval(() => {
      getRecords()
    }, 3000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return { records }
}

export default useRealtimeRecords
