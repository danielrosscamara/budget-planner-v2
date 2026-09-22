import { useMemo } from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'
import type { Transaction, Category } from '../types/budget'

export interface CategoryPieChartProps {
  transactions: Transaction[]
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: {
      name: string
      value: number
      color: string
      percent: number
    }
  }>
}

const CATEGORY_COLORS: Record<Category, string> = {
  'Food & Dining': '#f97316',
  'Transportation': '#8b5cf6',
  'Utilities & Bills': '#06b6d4',
  'Entertainment': '#ec4899',
  'Shopping': '#eab308',
  'Salary': '#22c55e',
  'Freelance': '#10b981',
  'Other': '#64748b',
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length > 0) {
    const data = payload[0]
    return (
      <div className="bg-slate-950/95 border border-slate-800 rounded-xl px-3.5 py-2.5 shadow-xl backdrop-blur-sm text-xs">
        <p className="font-semibold text-slate-200 mb-1 flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block"
            style={{ backgroundColor: data.payload.color }}
          />
          {data.name}
        </p>
        <p className="text-slate-400">
          Amount:{' '}
          <span className="font-semibold text-slate-100">
            ₱{data.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </p>
        <p className="text-slate-400">
          Share:{' '}
          <span className="font-semibold text-orange-400">
            {(data.payload.percent * 100).toFixed(1)}%
          </span>
        </p>
      </div>
    )
  }
  return null
}

export function CategoryPieChart({ transactions }: CategoryPieChartProps) {
  const { chartData, totalExpenses } = useMemo(() => {
    const expenseItems = transactions.filter((t) => t.type === 'expense')
    const total = expenseItems.reduce((sum, t) => sum + t.amount, 0)

    const totalsByCategory = expenseItems.reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

    const data = Object.entries(totalsByCategory)
      .map(([category, amount]) => ({
        name: category,
        value: amount,
        color: CATEGORY_COLORS[category as Category] || '#64748b',
        percent: total > 0 ? amount / total : 0,
      }))
      .sort((a, b) => b.value - a.value)

    return { chartData: data, totalExpenses: total }
  }, [transactions])

  if (chartData.length === 0) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <span>🍩</span> Expense Breakdown by Category
          </h3>
        </div>
        <div className="py-12 text-slate-400 space-y-2">
          <span className="text-3xl block">ℹ️</span>
          <p className="text-sm font-medium text-slate-300">No Expense Records Found</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Log an expense in the Transactions tab to see your category spending breakdown!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <span>🍩</span> Expense Breakdown by Category
        </h3>
        <span className="text-xs font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-1 rounded-full">
          Total: ₱{totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value: string) => (
                <span className="text-xs text-slate-300 mr-2">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
