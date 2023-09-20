import Image from 'next/image'
import Link from 'next/link'
import bg from '@/public/bg.jpg'

export default function Home() {
  return (
    <main className="relative flex h-screen items-center justify-center text-center">
      <div className="border-text/10 sm:bg-background/75 mx-4 w-full rounded-lg sm:w-[25rem] sm:border-2 sm:p-8">
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
      <Image
        className="absolute -z-10 h-full w-full object-cover brightness-[0.15] sm:brightness-50"
        src={bg}
        alt="bg"
      />
    </main>
  )
}
