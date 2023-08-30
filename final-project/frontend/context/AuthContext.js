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

  console.log(user, inAuthGroup)

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
  const [loading, setLoading] = useState(true)

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
      .then(res => res.json())
      .then(user => {
        setUser(user)
        router.replace('/dashboard')
      })
      .catch(err => {
        setError('username/password salah')
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
        fetch(baseURL + '/user_details/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: user.id,
            accounts: [2],
          }),
        }).then(() => {
          setUser(user)
          router.replace('/dashboard')
        })
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
