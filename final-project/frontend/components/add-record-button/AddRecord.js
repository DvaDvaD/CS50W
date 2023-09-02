'use client'
import { Form, Formik } from 'formik'
import { gsap } from 'gsap'
import React, { useLayoutEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import Input from '../formik/Input'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import DateInput from '../formik/DateInput'

const initialValues = {
  amount: null,
  description: '',
  date: '',
}

const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/

const validationSchema = Yup.object({
  amount: Yup.number('Invalid number')
    .test(
      'is-decimal',
      'The amount should be a decimal with maximum two digits after comma',
      val => {
        if (val != undefined) {
          return patternTwoDigisAfterComma.test(val)
        }
        return true
      },
    )
    .positive('Must be greater than 0')
    .required('Required'),
  description: Yup.string().required('Required'),
  date: Yup.date('Invalid date').required('Required'),
})

const AddRecord = () => {
  const animateRef = useRef(null)
  const tl = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [ctx, setCtx] = useState(gsap.context(() => {}, animateRef))
  const { error, loading, login } = useAuth()

  const onSubmit = values => {
    console.log(JSON.stringify(values))
  }

  useLayoutEffect(() => {
    if (isOpen) {
      ctx.add(() => {
        tl.current = gsap
          .timeline()
          .from('.gsap-backdrop', { opacity: 0 })
          .from('.gsap-slider', { y: '50vh' }, '-=0.5')
      })

      ctx.add('remove', () => {
        tl.current = gsap
          .timeline({
            onComplete: () => setIsOpen(false),
          })
          .to('.gsap-slider', { y: '50vh' })
          .to('.gsap-backdrop', { opacity: 0 }, '-=0.5')
      })
    }

    return () => {
      ctx.revert()
    }
  }, [isOpen])

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-background bg-primary hover:border-primary hover:bg-background hover:text-primary fixed bottom-5 right-5 cursor-pointer rounded-full p-5 text-center text-3xl leading-[0.5] transition-all hover:border"
      >
        +
      </button>

      {isOpen && (
        <div ref={animateRef}>
          {/* Backdrop */}
          <div
            onClick={() => ctx.remove()}
            className="gsap-backdrop fixed top-0 !m-0 h-full w-full bg-black/50"
          ></div>

          {/* Slide */}
          <div className="gsap-slider bg-background fixed bottom-0 w-full">
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
              <Form className="w-full p-8">
                <p className="mb-4 text-center text-3xl">Add Record</p>
                {error && (
                  <div className="mb-2 w-full rounded-lg border-2 border-red-500 bg-red-50 py-1.5 text-center text-red-500">
                    {error}
                  </div>
                )}
                <Input
                  name="amount"
                  label="Amount"
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="$0.00"
                />
                <Input
                  name="description"
                  label="Description"
                  placeholder="Description"
                />
                <DateInput
                  name="date"
                  label="Date and time"
                  placeholderText="Click to select date and time"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="text-background bg-primary disabled:bg-text/10 w-full rounded-lg py-1.5 text-center"
                >
                  Add Record
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  )
}

export default AddRecord
