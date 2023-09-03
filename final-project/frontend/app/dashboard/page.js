'use client'
import AccountCard from '@/components/dashboard/AccountCard'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import Link from 'next/link'
import { BiSolidDashboard } from 'react-icons/bi'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { FiSettings } from 'react-icons/fi'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const options = {
  responsive: true,
  layout: {
    padding: 20,
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [100, 200, 3, 50, 500],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [100, 200, 3, 50, 500].reverse(),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

const dummyData = [
  {
    balance: 500,
  },
  {
    balance: 500,
  },
]

const Dashboard = async () => {
  return (
    <main className="container mx-auto h-full px-4 lg:flex lg:max-w-full lg:px-0">
      <div className="group mt-6 space-y-6 px-6">
        <Link
          className={`hover:bg-text/10 relative flex items-center space-x-6 rounded-full p-2 transition-all hover:text-white`}
          href="/dashboard"
        >
          <BiSolidDashboard className="h-auto w-7" />
          <p className="bg-primary text-background absolute left-10 rounded-full px-2 py-0.5 opacity-0 transition-all group-hover:opacity-100">
            dashboard
          </p>
        </Link>
        <Link
          className={`hover:bg-text/10 relative flex items-center space-x-6 rounded-full p-2 transition-all hover:text-white`}
          href="/dashboard/records"
        >
          <FaMoneyBillTrendUp className="h-auto w-7" />
          <p className="bg-primary text-background absolute left-10 rounded-full px-2 py-0.5 opacity-0 transition-all group-hover:opacity-100">
            records
          </p>
        </Link>
        <Link
          className={`hover:bg-text/10 relative flex items-center space-x-6 rounded-full p-2 transition-all hover:text-white`}
          href="/dashboard/settings"
        >
          <FiSettings className="h-auto w-7" />
          <p className="bg-primary text-background absolute left-10 rounded-full px-2 py-0.5 opacity-0 transition-all group-hover:opacity-100">
            settings
          </p>
        </Link>
      </div>
      <div className="lg:border-text/10 lg:rounded-lg lg:border-2">
        <div className="mb-8 flex flex-wrap gap-4">
          {dummyData.map((data, idx) => (
            <AccountCard key={idx} balance={data.balance} />
          ))}
          <div className="border-text hover:border-accent text-accent w-32 cursor-pointer rounded-lg border-2 border-dashed p-3 text-center text-sm opacity-10 transition-all hover:opacity-100 sm:w-40">
            + Add Account
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {[1, 2, 3, 4].map((_, idx) => (
            <div
              key={idx}
              className="bg-text/[3%] w-full rounded-lg sm:w-[calc(50%-0.5rem)]"
            >
              <Line options={options} data={data} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Dashboard
