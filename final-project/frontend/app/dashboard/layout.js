import Navbar from '@/components/navbar/Navbar'
import React from 'react'

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
