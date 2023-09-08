'use client'
import React from 'react'

const Error = ({ error, reset }) => {
  return (
    <div className="flex h-full w-full flex-grow items-center justify-center">
      <div className="flex max-w-prose flex-col space-y-8">
        <h2 className="text-center text-xl">
          An error occurred: <br />
          <span className="text-red-500">{error.message}</span>
        </h2>
        <button
          className="text-background bg-primary mx-auto flex-grow rounded-lg px-6 py-1.5 text-center"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  )
}

export default Error
