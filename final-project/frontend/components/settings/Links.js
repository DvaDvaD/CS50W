'use client'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import React from 'react'

const Links = () => {
  const { logout } = useAuth()
  return (
    <>
      <Link
        href="/dashboard/change-username"
        className="hover:text-accent cursor-Linkointer mb-2 w-fit font-normal hover:underline"
      >
        Change username
      </Link>
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
