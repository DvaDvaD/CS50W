import { AuthProvider } from '@/context/AuthContext'
import './globals.css'
import { Nunito_Sans } from 'next/font/google'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito-sans',
})

export const metadata = {
  title: 'Money Tracker',
  description: 'CS50W Capstone project by David Lois',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunitoSans.variable}`}>
      <AuthProvider>
        <body className="min-h-screen font-bold">{children}</body>
      </AuthProvider>
    </html>
  )
}
