'use client'
import { baseURL } from '@/lib/fetch'
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
      router.replace('/')
    } else if (user && inAuthGroup) {
      router.replace('/dashboard')
    }
  }, [user, inAuthGroup])
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useProtectedRoute(user)

  useEffect(() => {
    fetch(baseURL + '/users/current_user/')
      .then(res => res.json())
      .then(data => {
        if (!data.id) {
          setUser(null)
        } else {
          setUser(data)
        }
        setLoading(false)
      })
  }, [])

  const login = data => {
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
        setUser(user)
        router.replace('/dashboard')
      })
      .catch(err => {
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
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        confirmation: data.confirmation,
        email: data.email,
      }),
    })
      .then(res => res.json())
      .then(user => {
        if (user.message) throw new Error(user.message)
        fetch(baseURL + '/user_details/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: user.id,
            accounts: [],
          }),
        }).then(() => {
          setUser(user)
          router.replace('/dashboard')
        })
      })
      .catch(err => {
        setError(err.message)
        setTimeout(() => setError(null), 6000)
      })
  }

  const contextData = {
    user,
    error,
    login,
    logout,
    register,
  }
  return (
    <>
      <AuthContext.Provider value={contextData}>
        {children}
      </AuthContext.Provider>
    </>
  )
}