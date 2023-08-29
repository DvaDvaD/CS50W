import { getTransactions } from '@/lib/fetch'
import Link from 'next/link'

export default async function Home() {
  const transactions = await getTransactions()

  return (
    <main className="flex h-screen items-center justify-center text-center">
      <div className="border-text/10 mx-4 w-full rounded-lg border-2 p-8 sm:w-[25rem]">
        <p className="mb-2 text-4xl">MONEY TRACKER</p>
        <p className="text-text/30 mb-20">
          by <span className="text-primary">David Lois</span>
        </p>
        <Link
          href="/auth/login"
          type="submit"
          className="text-background bg-primary mb-4 w-full rounded-lg py-1.5 text-center"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          type="submit"
          className="text-primary border-primary bg-background w-full rounded-lg border-2 py-1.5 text-center"
        >
          Register
        </Link>
      </div>
    </main>
  )
}
