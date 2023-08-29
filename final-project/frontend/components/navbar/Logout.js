'use client'
import { useAuth } from '@/context/AuthContext'
import React from 'react'

const Logout = () => {
  const { logout } = useAuth()
  return <span onClick={logout}>Logout</span>
}

export default Logout
