import { baseURL } from '@/lib/fetch'
import React, { useEffect, useState } from 'react'

const useRealtimeRecords = () => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getRecords = async () => {
      const res = await fetch(baseURL + '/transactions/', {
        cache: 'no-store',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
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
  }, [])

  return { records, loading }
}

export default useRealtimeRecords
