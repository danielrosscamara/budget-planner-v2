import { useState } from 'react'
import type { Transaction } from './types/budget'
import { TransactionForm } from './components/TransactionForm'

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

  // Currency Formatter Helper
  const formatPHP = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8 mt-6">
        
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Budget Planner v2
          </h1>
          <p className="text-slate-400 text-sm">
            Phase 3: Transaction Form & Controlled Inputs Active
          </p>
        </header>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Total Income Card */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Total Income
            </span>
            <p className="text-3xl font-bold text-emerald-400 mt-2">
              {formatPHP(totalIncome)}
            </p>
          </div>

          {/* Total Expenses Card */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              Total Expenses
            </span>
            <p className="text-3xl font-bold text-rose-400 mt-2">
              {formatPHP(totalExpenses)}
            </p>
          </div>

          {/* Net Balance Card */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Net Balance
            </span>
            <p className={`text-3xl font-bold mt-2 ${netBalance >= 0 ? 'text-cyan-400' : 'text-rose-400'}`}>
              {formatPHP(netBalance)}
            </p>
          </div>
        </div>

        {/* Form Component (Phase 3) */}
        <TransactionForm onAddTransaction={handleAddTransaction} />

        {/* List Preview */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-slate-200 mb-4 flex justify-between items-center">
            <span>Recent Transactions ({transactions.length} items)</span>
            <span className="text-xs text-slate-500 font-normal">Click delete to remove items</span>
          </h2>
          
          <div className="space-y-3">
            {transactions.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-800/50 rounded-xl"
              >
                <div>
                  <p className="font-medium text-slate-200">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.category} • {item.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-semibold ${item.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.type === 'income' ? '+' : '-'}{formatPHP(item.amount)}
                  </span>
                  <button
                    onClick={() => handleDeleteTransaction(item.id)}
                    className="px-3 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium rounded-lg transition-colors border border-rose-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {transactions.length === 0 && (
              <p className="text-center text-slate-500 py-6 text-sm">
                No transactions yet. Fill out the form above to add your first transaction!
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
