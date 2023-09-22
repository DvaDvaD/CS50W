import { baseURL } from '@/lib/fetch'
import React, { useState } from 'react'

const usePostRecords = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const postRecord = async record => {
    setLoading(true)

    try {
      const res = await fetch(baseURL + '/transactions/', {
        cache: 'no-store',
        method: 'POST',
        body: JSON.stringify(record),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      return res.json()
    } catch (err) {
      setLoading(false)
      setMessage(err.message)
    }

    setLoading(false)
  }

  return {
    loading,
    message,
    postRecord,
  }
}

export default usePostRecords
