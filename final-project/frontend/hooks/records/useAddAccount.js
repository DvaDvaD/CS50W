import { useAuth } from '@/context/AuthContext'
import { baseURL } from '@/lib/fetch'
import React from 'react'

const useAddAccount = () => {
  const { setAccounts, user } = useAuth()

  const addAccount = async () => {
    if (localStorage.getItem('token')) {
      const res = await fetch(baseURL + '/accounts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ user: [user.id] }),
      })

      const newAccount = await res.json()
      setAccounts(prev => [...prev, newAccount])
    }
  }

  return { addAccount }
}

export default useAddAccount
