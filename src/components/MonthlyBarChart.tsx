import { useMemo } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import type { Transaction } from '../types/budget'

export interface MonthlyBarChartProps {
  transactions: Transaction[]
}

interface CustomBarTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    fill: string
    dataKey: string
  }>
  label?: string
}

function formatMonth(dateStr: string): { label: string; key: string } {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    return { label: 'Recent', key: '0000-00' }
  }
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()
  const key = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}`
  return { label: `${month} ${year}`, key }
}

function CustomBarTooltip({ active, payload, label }: CustomBarTooltipProps) {
  if (active && payload && payload.length > 0) {
    const incomeItem = payload.find((p) => p.dataKey === 'income')
    const expenseItem = payload.find((p) => p.dataKey === 'expense')
    const income = incomeItem ? incomeItem.value : 0
    const expense = expenseItem ? expenseItem.value : 0
    const net = income - expense

    return (
      <div className="bg-slate-950/95 border border-slate-800 rounded-xl px-3.5 py-2.5 shadow-xl backdrop-blur-sm text-xs space-y-1.5">
        <p className="font-semibold text-slate-200 border-b border-slate-800 pb-1 flex items-center gap-1.5">
          <span>📅</span> {label}
        </p>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Income:
            </span>
            <span className="font-mono font-semibold text-slate-100">
              ₱{income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-rose-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
              Expense:
            </span>
            <span className="font-mono font-semibold text-slate-100">
              ₱{expense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-800/80">
            <span className="text-slate-400">Net Flow:</span>
            <span
              className={`font-mono font-semibold ${
                net >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {net >= 0 ? '+' : ''}₱{net.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function MonthlyBarChart({ transactions }: MonthlyBarChartProps) {
  const monthlyData = useMemo(() => {
    if (transactions.length === 0) return []

    const buckets: Record<string, { label: string; key: string; income: number; expense: number }> = {}

    transactions.forEach((t) => {
      const { label, key } = formatMonth(t.date)
      if (!buckets[key]) {
        buckets[key] = { label, key, income: 0, expense: 0 }
      }
      if (t.type === 'income') {
        buckets[key].income += t.amount
      } else {
        buckets[key].expense += t.amount
      }
    })

    return Object.values(buckets)
      .sort((a, b) => a.key.localeCompare(b.key))
      .map((b) => ({
        month: b.label,
        income: b.income,
        expense: b.expense,
        net: b.income - b.expense,
      }))
  }, [transactions])

  const totalNet = useMemo(() => {
    return monthlyData.reduce((sum, item) => sum + item.net, 0)
  }, [monthlyData])

  if (monthlyData.length === 0) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <span>📊</span> Cash Flow: Income vs. Expenses
          </h3>
        </div>
        <div className="py-12 text-slate-400 space-y-2">
          <span className="text-3xl block">ℹ️</span>
          <p className="text-sm font-medium text-slate-300">No Transaction Records Found</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Add income and expense entries in the Transactions tab to visualize your monthly cash flow!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <span>📊</span> Cash Flow: Income vs. Expenses
        </h3>
        <span
          className={`text-xs font-mono border px-2.5 py-1 rounded-full ${
            totalNet >= 0
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
          }`}
        >
          Net Flow: {totalNet >= 0 ? '+' : ''}₱
          {totalNet.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              tickFormatter={(val: number) => `₱${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
            />
            <Tooltip content={<CustomBarTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              height={32}
              formatter={(value: string) => (
                <span className="text-xs text-slate-300 mr-2 capitalize">{value}</span>
              )}
            />
            <Bar
              dataKey="income"
              name="Income"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
              maxBarSize={44}
            />
            <Bar
              dataKey="expense"
              name="Expense"
              fill="#f43f5e"
              radius={[6, 6, 0, 0]}
              maxBarSize={44}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
