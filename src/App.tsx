import { useState, useEffect } from 'react'
import type { Transaction } from './types/budget'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import { TransactionForm } from './components/TransactionForm'
import { TransactionList } from './components/TransactionList'
import { Footer } from './components/Footer'
import { loadTransactions, saveTransactions } from './utils/storage'

function App() {
  // Core Transaction State hydrated from localStorage via Lazy Initializer
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = loadTransactions()
    if (saved.length > 0) return saved

    // Default initial sample data if localStorage is empty
    return [
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
    ]
  })

  // Save to localStorage whenever transactions state changes
  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])

  // Handler Functions
  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions((prev) => [newTransaction, ...prev])
  }

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id))
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all transactions? This action cannot be undone.')) {
      setTransactions([])
    }
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
          onClearAllTransactions={handleClearAll}
        />

        {/* Developer Profile Footer */}
        <Footer />

      </div>
    </div>
  )
}

export default App
