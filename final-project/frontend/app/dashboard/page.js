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
import AddRecordDesktop from '@/components/add-record-button/AddRecordDesktop'

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
    <div className="lg:flex lg:items-start lg:space-x-8 lg:p-8">
      <div className="lg:flex lg:w-2/3 lg:flex-col">
        <div className="mb-8 flex flex-wrap gap-4">
          {dummyData.map((data, idx) => (
            <AccountCard key={idx} balance={data.balance} />
          ))}
          <div className="border-text hover:border-accent text-accent flex w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-3 text-center text-sm opacity-10 transition-all hover:opacity-100 sm:w-40 lg:w-48 lg:p-4 lg:text-base">
            <p>+ Add Account</p>
          </div>
        </div>

        <div className="flex flex-grow flex-wrap justify-center gap-4">
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
      <div className="bg-text/[3%] hidden w-1/3 rounded-lg lg:block">
        <AddRecordDesktop />
      </div>
    </div>
  )
}

export default Dashboard
