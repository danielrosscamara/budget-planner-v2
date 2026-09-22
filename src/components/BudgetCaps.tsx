import { useMemo } from 'react'
import type { Transaction, Category } from '../types/budget'

export interface BudgetCapsProps {
  transactions: Transaction[]
}

const DEFAULT_BUDGET_CAPS: Record<Category, number> = {
  'Food & Dining': 6000,
  'Transportation': 3000,
  'Utilities & Bills': 4000,
  'Entertainment': 2000,
  'Shopping': 3000,
  'Salary': 0,
  'Freelance': 0,
  'Other': 1500,
}

const CATEGORY_ICONS: Record<Category, string> = {
  'Food & Dining': '🍔',
  'Transportation': '🚗',
  'Utilities & Bills': '⚡',
  'Entertainment': '🎬',
  'Shopping': '🛍️',
  'Salary': '💼',
  'Freelance': '💻',
  'Other': '📦',
}

const TRACKED_CATEGORIES: Category[] = [
  'Food & Dining',
  'Transportation',
  'Utilities & Bills',
  'Entertainment',
  'Shopping',
  'Other',
]

export function BudgetCaps({ transactions }: BudgetCapsProps) {
  const capItems = useMemo(() => {
    const expenseItems = transactions.filter((t) => t.type === 'expense')

    const spentByCategory = expenseItems.reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

    return TRACKED_CATEGORIES.map((cat) => {
      const cap = DEFAULT_BUDGET_CAPS[cat] || 1000
      const spent = spentByCategory[cat] || 0
      const percentage = cap > 0 ? (spent / cap) * 100 : 0

      let status: 'safe' | 'warning' | 'danger' = 'safe'
      if (percentage >= 100) {
        status = 'danger'
      } else if (percentage >= 75) {
        status = 'warning'
      }

      return {
        category: cat,
        icon: CATEGORY_ICONS[cat] || '🏷️',
        cap,
        spent,
        percentage,
        overAmount: spent > cap ? spent - cap : 0,
        status,
      }
    })
  }, [transactions])

  const safeCount = capItems.filter((item) => item.status === 'safe').length
  const warningCount = capItems.filter((item) => item.status === 'warning').length
  const dangerCount = capItems.filter((item) => item.status === 'danger').length
  const totalCap = capItems.reduce((sum, item) => sum + item.cap, 0)
  const totalSpent = capItems.reduce((sum, item) => sum + item.spent, 0)

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <span>🎯</span> Category Budget Limits & Spending Alerts
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Track monthly spending caps with real-time threshold indicators.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 rounded-full">
            Total Cap: ₱{totalCap.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span
            className={`text-xs font-mono border px-3 py-1 rounded-full ${
              totalSpent <= totalCap
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}
          >
            Spent: ₱{totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Category Progress List */}
      <div className="space-y-4">
        {capItems.map((item) => (
          <div key={item.category} className="space-y-1.5">
            {/* Category Meta */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">{item.icon}</span>
                <span className="font-medium text-slate-200">{item.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono">
                  ₱{item.spent.toLocaleString('en-US', { minimumFractionDigits: 2 })} / ₱
                  {item.cap.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <span className="font-semibold text-slate-300 font-mono">
                  ({item.percentage.toFixed(1)}%)
                </span>
                {item.status === 'safe' && (
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full font-medium">
                    🟢 Safe
                  </span>
                )}
                {item.status === 'warning' && (
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] px-2 py-0.5 rounded-full font-medium">
                    🟡 Nearing Limit
                  </span>
                )}
                {item.status === 'danger' && (
                  <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] px-2 py-0.5 rounded-full font-medium">
                    🔴 Over by ₱{item.overAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>
            </div>

            {/* Progress Track */}
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  item.status === 'safe'
                    ? 'bg-emerald-500'
                    : item.status === 'warning'
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(item.percentage, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <span className="text-slate-300 font-medium">Budget Health Overview:</span>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-medium">🟢 {safeCount} Safe</span>
          <span className="text-amber-400 font-medium">🟡 {warningCount} Warning</span>
          <span className="text-rose-400 font-medium">🔴 {dangerCount} Exceeded</span>
        </div>
      </div>
    </div>
  )
}
