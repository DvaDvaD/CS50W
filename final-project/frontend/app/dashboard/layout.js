import AddRecord from '@/components/add-record-button/AddRecord'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'
import Link from 'next/link'
import { BiSolidDashboard } from 'react-icons/bi'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { FiSettings } from 'react-icons/fi'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex-1 px-4 lg:flex lg:max-w-full lg:px-0">
        <div className="group mt-6 hidden space-y-6 px-6 lg:block">
          <Link
            className={`hover:bg-text/10 relative flex items-center space-x-6 rounded-full p-2 transition-all hover:text-white`}
            href="/dashboard"
          >
            <BiSolidDashboard className="h-auto w-7" />
            <p className="bg-primary text-background absolute -left-10 rounded-full px-2 py-0.5 opacity-0 transition-all group-hover:left-10 group-hover:opacity-100">
              dashboard
            </p>
          </Link>
          <Link
            className={`hover:bg-text/10 relative flex items-center space-x-6 rounded-full p-2 transition-all hover:text-white`}
            href="/dashboard/records"
          >
            <FaMoneyBillTrendUp className="h-auto w-7" />
            <p className="bg-primary text-background absolute -left-10 rounded-full px-2 py-0.5 opacity-0 transition-all group-hover:left-10 group-hover:opacity-100">
              records
            </p>
          </Link>
          <Link
            className={`hover:bg-text/10 relative flex items-center space-x-6 rounded-full p-2 transition-all hover:text-white`}
            href="/dashboard/settings"
          >
            <FiSettings className="h-auto w-7" />
            <p className="bg-primary text-background absolute -left-10 rounded-full px-2 py-0.5 opacity-0 transition-all group-hover:left-10 group-hover:opacity-100">
              settings
            </p>
          </Link>
        </div>

        <div className="lg:border-text/10 h-full lg:mb-4 lg:mr-4 lg:rounded-lg lg:border-2">
          {children}
        </div>
      </main>
      <div className="lg:hidden">
        <AddRecord />
      </div>
    </div>
  )
}
