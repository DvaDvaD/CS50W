import { useAuth } from '@/context/AuthContext'
import React, { useEffect } from 'react'

const useRealtimeDebts = () => {
  const { user, getDebts, accounts } = useAuth()

  useEffect(() => {
    let intervalId
    if (user && user.debt_records) {
      getDebts(user)
      intervalId = setInterval(() => {
        getDebts(user)
      }, 3000)
    }

    return () => clearInterval(intervalId)
  }, [user, accounts])
}

export default useRealtimeDebts
