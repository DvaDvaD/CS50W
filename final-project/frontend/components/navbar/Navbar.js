import React from 'react'
import Username from './Username'
import Menu from './Menu'

const Navbar = () => {
  return (
    <nav className="flex items-center space-x-4 p-3 md:p-4 lg:p-6">
      <Menu />
      <p>MONEY TRACKER</p>
      <p className="hidden lg:block">
        Welcome back, <Username />
      </p>
    </nav>
  )
}

export default Navbar
