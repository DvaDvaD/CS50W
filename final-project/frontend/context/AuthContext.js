'use client'
import { baseURL } from '@/lib/fetch'
import { getURL } from 'next/dist/shared/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const useProtectedRoute = user => {
  const pathname = usePathname()
  const inAuthGroup = pathname.includes('auth') || pathname === '/'
  const router = useRouter()

  useEffect(() => {
    if (!user && !inAuthGroup) {
      // router.replace('/')
    } else if (user && inAuthGroup) {
      router.replace('/dashboard')
    }
  }, [user, inAuthGroup])
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState('')
  const [accounts, setAccounts] = useState([])
  const [debts, setDebts] = useState([])
  const [activeAccountIndex, setActiveAccountIndex] = useState(0)

  const router = useRouter()

  useProtectedRoute(user)

  const getDebts = data => {
    Promise.all(
      data.debt_records.map(debt_record => {
        return fetch(baseURL + '/debt_records/' + debt_record + '/').then(res =>
          res.json(),
        )
      }),
    ).then(debt_records => {
      Promise.all(
        debt_records.map(debt_record => {
          return fetch(
            baseURL + '/users/debt_records/' + debt_record.id + '/',
            {
              headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
              },
              cache: 'no-cache',
            },
          )
            .then(res => res.json())
            .then(data => {
              return { ...debt_record, transactions: data }
            })
        }),
      ).then(debt_records => {
        setDebts(debt_records)
      })
    })
  }

  const getCurrentUser = () => {
    setLoading(true)
    fetch(baseURL + '/users/current_user/', {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(data => {
        if (!data.id) {
          setUser(null)
        } else {
          setToken(localStorage.getItem('token'))
          setUser(data)
          Promise.all(
            data.accounts.map(account => {
              return fetch(baseURL + '/accounts/' + account + '/').then(res =>
                res.json(),
              )
            }),
          ).then(accounts => {
            setAccounts(accounts)
          })
          getDebts(data)
        }
        setLoading(false)
      })
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  const login = data => {
    setLoading(true)
    fetch(baseURL + '/login/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Wrong username/password')
        return res.json()
      })
      .then(user => {
        fetch(baseURL + '/api-token-auth/', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(data => {
            setToken(data.token)
            if (!localStorage.getItem('token')) {
              localStorage.setItem('token', data.token)
            }
            setLoading(false)
            setUser(user)
            getCurrentUser()
            router.replace('/dashboard')
          })
      })
      .catch(err => {
        setLoading(false)
        setError(err.message)
        setTimeout(() => setError(null), 6000)
      })
  }

  const logout = () => {
    fetch(baseURL + '/logout/', {
      method: 'DELETE',
    }).then(res => {
      if (res.ok) {
        router.replace('/')
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
      }
    })
  }

  const register = data => {
    setLoading(true)
    fetch(baseURL + '/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(user => {
        if (user.message) throw new Error(user.message)
        setLoading(false)
        setUser(user)
        Promise.all(
          user.accounts.map(account => {
            return fetch(baseURL + '/accounts/' + account + '/', {
              cache: 'no-store',
            }).then(res => res.json())
          }),
        ).then(accounts => {
          setAccounts(accounts)
        })
        login({ username: data.username, password: data.password })
        router.replace('/dashboard')
      })
      .catch(err => {
        setLoading(false)
        setError(err.message)
        setTimeout(() => setError(null), 6000)
      })
  }

  const changeUsername = values => {
    setLoading(true)
    fetch(baseURL + '/change_username/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(values),
    })
      .then(res => {
        if (!res.ok) throw new Error('Username already taken')
        setLoading(false)
        setUser({ ...user, username: values.username })
      })
      .catch(err => {
        setLoading(false)
        setError(err.message)
        setTimeout(() => setError(null), 6000)
      })
  }

  const contextData = {
    token,
    user,
    loading,
    error,
    accounts,
    activeAccountIndex,
    debts,
    getDebts,
    setDebts,
    setUser,
    setAccounts,
    setActiveAccountIndex,
    getCurrentUser,
    login,
    logout,
    register,
    changeUsername,
  }
  return (
    <>
      <AuthContext.Provider value={contextData}>
        {children}
      </AuthContext.Provider>
    </>
  )
}
