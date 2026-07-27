import { useState } from 'react'
import type { Transaction, TransactionType, Category } from '../types/budget'

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void
}

const CATEGORIES: Category[] = [
  'Salary',
  'Freelance',
  'Food & Dining',
  'Transportation',
  'Utilities & Bills',
  'Entertainment',
  'Shopping',
  'Other',
]

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  // Controlled input states
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<TransactionType>('expense')
  const [category, setCategory] = useState<Category>('Food & Dining')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  // Validation error state
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Form Validation
    if (!title.trim()) {
      setError('Please enter a description or title.')
      return
    }

    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount greater than 0.')
      return
    }

    setError('')

    // Build new transaction object
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      title: title.trim(),
      amount: numericAmount,
      type,
      category,
      date,
    }

    // Pass data up to parent component (App.tsx)
    onAddTransaction(newTransaction)

    // Reset form fields
    setTitle('')
    setAmount('')
    setError('')
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm">
          ➕
        </span>
        Add New Transaction
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm rounded-xl flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Type Toggle: Income vs Expense */}
        <div className="grid grid-cols-2 gap-3 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setType('income')}
            className={`py-2.5 px-4 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
              type === 'income'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>📈</span> Income
          </button>

          <button
            type="button"
            onClick={() => setType('expense')}
            className={`py-2.5 px-4 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
              type === 'expense'
                ? 'bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>📉</span> Expense
          </button>
        </div>

        {/* Title Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Description / Title
          </label>
          <input
            type="text"
            placeholder="e.g. Monthly Salary, Groceries"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm"
          />
        </div>

        {/* Amount & Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Amount Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Amount (₱)
            </label>
            <input
              type="number"
              step="any"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm"
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm text-slate-950 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
            type === 'income'
              ? 'bg-emerald-400 hover:bg-emerald-300 shadow-emerald-400/20'
              : 'bg-rose-400 hover:bg-rose-300 shadow-rose-400/20'
          }`}
        >
          <span>Save Transaction</span>
        </button>
      </form>
    </div>
  )
}
