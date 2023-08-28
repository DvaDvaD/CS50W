import { getTransactions } from '@/lib/fetch'

export default async function Home() {
  const transactions = await getTransactions()

  return (
    <main className="whitespace-pre">
      {JSON.stringify(transactions, null, 2)}
    </main>
  )
}
