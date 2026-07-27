import { useState } from 'react'
import type { Transaction } from './types/budget'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import { TransactionForm } from './components/TransactionForm'
import { TransactionList } from './components/TransactionList'

function App() {
  // Core Transaction State initialized with sample data
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      title: 'Web Dev Freelance',
      amount: 25000,
      type: 'income',
      category: 'Freelance',
      date: '2026-07-27',
    },
    {
      id: '2',
      title: 'Grocery Shopping',
      amount: 3500,
      type: 'expense',
      category: 'Food & Dining',
      date: '2026-07-27',
    },
    {
      id: '3',
      title: 'Electricity Bill',
      amount: 4200,
      type: 'expense',
      category: 'Utilities & Bills',
      date: '2026-07-26',
    },
  ])

  // Handler Functions
  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions((prev) => [newTransaction, ...prev])
  }

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id))
  }

  // Derived Values (Calculated inline without extra state variables)
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const netBalance = totalIncome - totalExpenses

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8 mt-6">
        
        {/* Modular Header */}
        <Header />

        {/* Overview Dashboard */}
        <Dashboard
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          netBalance={netBalance}
        />

        {/* Transaction Input Form */}
        <TransactionForm onAddTransaction={handleAddTransaction} />

        {/* Filterable Transaction List */}
        <TransactionList
          transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
        />

      </div>
    </div>
  )
}

export default App
