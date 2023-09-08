import Image from 'next/image'
import React from 'react'
import loadingIcon from '@/public/loading-icon.png'

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="space-y-2">
        <Image
          className="mx-auto h-auto w-16"
          src={loadingIcon}
          alt="loading-icon"
        />
        <p>Loading user data...</p>
      </div>
    </div>
  )
}

export default Loading
