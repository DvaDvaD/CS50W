'use client'
import { useAuth } from '@/context/AuthContext'
import React from 'react'

const Username = () => {
  const { user } = useAuth()
  return <span>{user?.username}</span>
}

export default Username
