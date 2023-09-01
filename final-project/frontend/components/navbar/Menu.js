'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FiMenu, FiSettings } from 'react-icons/fi'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { BiSolidDashboard } from 'react-icons/bi'

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <FiMenu
        onClick={() => setIsOpen(!isOpen)}
        className="h-auto w-8 cursor-pointer"
      />
      {isOpen && (
        <div className="fixed left-0 top-0 z-10 !m-0 h-full w-full">
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-0 z-0 h-full w-full bg-black/50"
          ></div>

          <div className="bg-background absolute top-0 z-10 h-full w-[20rem] space-y-4 p-8">
            <p className="mb-12 text-xl">MONEY TRACKER</p>
            <Link
              className="hover:bg-text/10 flex items-center space-x-6 rounded-lg p-3"
              href="/dashboard"
            >
              <BiSolidDashboard className="h-auto w-7" />
              <p>Dashboard</p>
            </Link>
            <Link
              className="hover:bg-text/10 flex items-center space-x-6 rounded-lg p-3"
              href="/dashboard/records"
            >
              <FaMoneyBillTrendUp className="h-auto w-7" />
              <p>Records</p>
            </Link>
            <Link
              className="hover:bg-text/10 flex items-center space-x-6 rounded-lg p-3"
              href="/dashboard/settings"
            >
              <FiSettings className="h-auto w-7" />
              <p>Settings</p>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Menu
