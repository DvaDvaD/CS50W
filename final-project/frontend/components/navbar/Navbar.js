import React from 'react'
import Username from './Username'
import Logout from './Logout'
import Menu from './Menu'

const Navbar = () => {
  return (
    <nav className="flex items-center space-x-4 p-6">
      <Menu />
      <p>MONEY TRACKER</p>
      <Logout />
      <p className="hidden lg:block">
        Welcome back, <Username />
      </p>
    </nav>
  )
}

export default Navbar
