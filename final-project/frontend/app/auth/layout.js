import Image from 'next/image'
import React from 'react'
import bg from '@/public/bg.jpg'

const Layout = ({ children }) => {
  return (
    <div className="relative">
      {children}
      <Image
        className="absolute top-0 -z-10 h-full w-full object-cover brightness-[0.15]"
        src={bg}
        alt="bg"
      />
    </div>
  )
}

export default Layout
