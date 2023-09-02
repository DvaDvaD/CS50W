import AddRecord from '@/components/add-record-button/AddRecord'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <AddRecord />
    </>
  )
}
