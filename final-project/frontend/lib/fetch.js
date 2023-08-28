export const baseURL = 'http://127.0.0.1:8000'

export const getTransactions = async () => {
  const res = await fetch(baseURL + '/transactions/', { cache: 'no-store' })
  return res.json()
}

export const getAccounts = async () => {
  const res = await fetch(baseURL + '/accounts/', { cache: 'no-store' })
  return res.json()
}

export const getUserDetails = async () => {
  const res = await fetch(baseURL + '/user_details/', { cache: 'no-store' })
  return res.json()
}

export const getTransactionDetail = async id => {
  const res = await fetch(baseURL + '/transactions/' + id + '/', {
    cache: 'no-store',
  })
  return res.json()
}

export const getAccountDetail = async id => {
  const res = await fetch(baseURL + '/accounts/' + id + '/', {
    cache: 'no-store',
  })
  return res.json()
}

export const getUserDetailDetail = async id => {
  const res = await fetch(baseURL + '/user_details/' + id + '/', {
    cache: 'no-store',
  })
  return res.json()
}
