'use client'
import Link from 'next/link'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { FiMenu, FiSettings } from 'react-icons/fi'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { BiSolidDashboard } from 'react-icons/bi'
import { gsap } from 'gsap'

const Menu = () => {
  const navSliderRef = useRef(null)
  const tl = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const [ctx, setCtx] = useState(gsap.context(() => {}, navSliderRef))

  useLayoutEffect(() => {
    if (isOpen) {
      ctx.add(() => {
        tl.current = gsap
          .timeline()
          .from('.gsap-backdrop', { opacity: 0 })
          .from('.gsap-slider', { x: -500 }, '-=0.5')
      })

      ctx.add('remove', () => {
        tl.current = gsap
          .timeline({
            onComplete: () => setIsOpen(false),
          })
          .to('.gsap-slider', { x: -500 })
          .to('.gsap-backdrop', { opacity: 0 }, '-=0.5')
      })
    }

    return () => {
      ctx.revert()
    }
  }, [isOpen])

  return (
    <>
      <FiMenu
        onClick={() => setIsOpen(true)}
        className="hover:bg-text/10 h-auto w-12 cursor-pointer rounded-full p-2 transition-all"
      />
      <div ref={navSliderRef}>
        {isOpen && (
          <div className="fixed left-0 top-0 z-10 !m-0 h-full w-full">
            {/* Backdrop */}
            <div
              onClick={() => ctx.remove()}
              className="gsap-backdrop absolute top-0 z-0 h-full w-full bg-black/50"
            ></div>

            <div className="gsap-slider bg-background absolute top-0 z-10 h-full w-[20rem] space-y-4 p-8">
              <p className="mb-12 text-xl">MONEY TRACKER</p>
              <Link
                className="hover:bg-text/10 flex items-center space-x-6 rounded-lg p-3 transition-all"
                href="/dashboard"
              >
                <BiSolidDashboard className="h-auto w-7" />
                <p>Dashboard</p>
              </Link>
              <Link
                className="hover:bg-text/10 flex items-center space-x-6 rounded-lg p-3 transition-all"
                href="/dashboard/records"
              >
                <FaMoneyBillTrendUp className="h-auto w-7" />
                <p>Records</p>
              </Link>
              <Link
                className="hover:bg-text/10 flex items-center space-x-6 rounded-lg p-3 transition-all"
                href="/dashboard/settings"
              >
                <FiSettings className="h-auto w-7" />
                <p>Settings</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Menu
