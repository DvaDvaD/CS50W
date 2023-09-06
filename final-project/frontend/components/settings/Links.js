'use client'
import { useAuth } from '@/context/AuthContext'
import React from 'react'

const Links = () => {
  const { logout } = useAuth()
  return (
    <>
      <p className="hover:text-accent mb-2 w-fit cursor-pointer font-normal hover:underline">
        Change username
      </p>
      <p
        onClick={logout}
        className="hover:text-accent w-fit cursor-pointer font-normal hover:underline"
      >
        Log out
      </p>
    </>
  )
}

export default Links
