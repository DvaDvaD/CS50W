import React from 'react'
import Username from './Username'
import Logout from './Logout'

const Navbar = () => {
  return (
    <nav>
      <p>MONEY TRACKER</p>
      <Logout />
      <p>
        Welcome back, <Username />
      </p>
    </nav>
  )
}

export default Navbar
