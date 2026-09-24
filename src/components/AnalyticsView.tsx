import type { Transaction } from '../types/budget'
import { CategoryPieChart } from './CategoryPieChart'
import { MonthlyBarChart } from './MonthlyBarChart'
import { BudgetCaps } from './BudgetCaps'

export interface AnalyticsViewProps {
  transactions: Transaction[]
}

export function AnalyticsView({ transactions }: AnalyticsViewProps) {
  return (
    <div className="space-y-6">
      {/* Top 2-Column Responsive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryPieChart transactions={transactions} />
        <MonthlyBarChart transactions={transactions} />
      </div>

      {/* Full-Width Category Budget Caps & Spending Alerts */}
      <BudgetCaps transactions={transactions} />
    </div>
  )
}
