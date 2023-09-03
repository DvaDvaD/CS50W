import React from 'react'
import Username from './Username'
import Menu from './Menu'

const Navbar = () => {
  return (
    <nav className="border-text/10 mb-8 flex items-center space-x-4 border-b p-3 md:p-4 lg:mb-0 lg:border-transparent lg:px-6">
      <Menu />
      <p>MONEY TRACKER</p>
      <p className="hidden lg:block">
        Welcome back, <Username />
      </p>
    </nav>
  )
}

export default Navbar
