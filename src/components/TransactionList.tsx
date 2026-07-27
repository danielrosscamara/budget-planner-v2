import { useState } from 'react'
import type { Transaction, Category } from '../types/budget'
import { TransactionItem } from './TransactionItem'

interface TransactionListProps {
  transactions: Transaction[]
  onDeleteTransaction: (id: string) => void
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

export function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  // Local Component State for Filter Controls
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  // Filter transactions dynamically
  const filteredTransactions = transactions.filter((t) => {
    const matchesType = typeFilter === 'all' || t.type === typeFilter
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter
    return matchesType && matchesCategory
  })

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md space-y-6">
      
      {/* Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>📋</span> Recent Transactions
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Showing {filteredTransactions.length} of {transactions.length} total entries
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Type Filter Buttons */}
          <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                typeFilter === 'all'
                  ? 'bg-slate-800 text-slate-100 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTypeFilter('income')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                typeFilter === 'income'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setTypeFilter('expense')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                typeFilter === 'expense'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Expense
            </button>
          </div>

          {/* Category Dropdown Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transaction List Items */}
      <div className="space-y-3">
        {filteredTransactions.map((item) => (
          <TransactionItem
            key={item.id}
            transaction={item}
            onDelete={onDeleteTransaction}
          />
        ))}

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12 px-4 border border-dashed border-slate-800 rounded-xl bg-slate-950/40">
            <span className="text-3xl block mb-2">🔍</span>
            <p className="text-sm font-semibold text-slate-300">No transactions found</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              {transactions.length === 0
                ? 'Your transaction list is empty. Add a transaction using the form above!'
                : 'Try adjusting your type or category filter.'}
            </p>
          </div>
        )}
      </div>

    </div>
  )
}
