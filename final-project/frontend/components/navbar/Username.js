'use client'
import { useAuth } from '@/context/AuthContext'
import React from 'react'

const Username = () => {
  const { user, loading } = useAuth()
  return <span>{loading ? 'Loading...' : user?.username}</span>
}

export default Username
