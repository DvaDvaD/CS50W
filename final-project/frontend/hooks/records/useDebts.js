import { useAuth } from '@/context/AuthContext'
import { baseURL } from '@/lib/fetch'
import React from 'react'
import usePostRecords from './useRecords'

const useDebts = () => {
  const { user, getCurrentUser } = useAuth()
  const { postRecord } = usePostRecords()
  const postPerson = async name => {
    const res = await fetch(baseURL + '/debt_records/', {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name, user: [user.id], transactions: [] }),
    })
    getCurrentUser()
  }

  const putDebt = async (transaction, debt_records) => {
    const newTransaction = await postRecord(transaction)
    const res = await fetch(
      baseURL + '/debt_records/' + debt_records.id + '/',
      {
        cache: 'no-store',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          id: debt_records.id,
          name: debt_records.name,
          user: [debt_records.user[0]],
          transactions: [
            ...debt_records.transactions.map(transaction => transaction.id),
            newTransaction.id,
          ],
        }),
      },
    )
    getCurrentUser()
  }

  const deletePerson = async data => {
    const res = await fetch(baseURL + '/debt_records/' + data.id + '/', {
      cache: 'no-store',
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
    getCurrentUser()
  }

  return { postPerson, deletePerson, putDebt }
}

export default useDebts
