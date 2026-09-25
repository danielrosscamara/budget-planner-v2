import { useState, useEffect } from 'react'
import type { Transaction, TabType, Account } from './types/budget'
import { Header } from './components/Header'
import { Navbar } from './components/Navbar'
import { Dashboard } from './components/Dashboard'
import { TransactionForm } from './components/TransactionForm'
import { TransactionList } from './components/TransactionList'
import { Footer } from './components/Footer'
import { AnalyticsView } from './components/AnalyticsView'
import { AccountsView } from './components/AccountsView'
import { loadTransactions, saveTransactions, loadAccounts, saveAccounts } from './utils/storage'

function App() {
  // Phase 7: Navigation Tab State
  const [activeTab, setActiveTab] = useState<TabType>('transactions')

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

  // Phase 9: Accounts State hydrated from localStorage via Lazy Initializer
  const [accounts, setAccounts] = useState<Account[]>(loadAccounts)

  // Save to localStorage whenever accounts state changes
  useEffect(() => {
    saveAccounts(accounts)
  }, [accounts])

  // Handler Functions
  const handleUpdateAccountBalance = (accountId: string, newBalance: number) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId ? { ...acc, balance: newBalance } : acc
      )
    )
  }
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
        
        {/* Header */}
        <Header />

        {/* Phase 7: Top Navigation Bar */}
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* View 1: Transactions Tab */}
        {activeTab === 'transactions' && (
          <>
            <Dashboard
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              netBalance={netBalance}
            />
            <TransactionForm onAddTransaction={handleAddTransaction} />
            <TransactionList
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
              onClearAllTransactions={handleClearAll}
            />
          </>
        )}

        {/* View 2: Accounts Tab (Phase 9 Complete) */}
        {activeTab === 'accounts' && (
          <AccountsView
            accounts={accounts}
            onUpdateAccountBalance={handleUpdateAccountBalance}
          />
        )}

        {/* View 3: Analytics Tab (Phase 8 Complete) */}
        {activeTab === 'analytics' && (
          <AnalyticsView transactions={transactions} />
        )}

        {/* View 4: Goals Tab Placeholder (Phase 10) */}
        {activeTab === 'goals' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
            <span className="text-4xl block">🎯</span>
            <h3 className="text-lg font-bold text-slate-200">Savings Goals Tracker</h3>
            <p className="text-xs max-w-sm mx-auto text-slate-500">
              Set savings targets and track contribution progress in Phase 10!
            </p>
          </div>
        )}

        {/* Developer Profile Footer */}
        <Footer />

      </div>
    </div>
  )
}

export default App
