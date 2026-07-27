interface DashboardProps {
  totalIncome: number
  totalExpenses: number
  netBalance: number
}

export function Dashboard({ totalIncome, totalExpenses, netBalance }: DashboardProps) {
  const formatPHP = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Income Card */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/30 transition-all">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Total Income
          </span>
          <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold">
            📈
          </span>
        </div>
        <p className="text-3xl font-extrabold text-emerald-400">
          {formatPHP(totalIncome)}
        </p>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:border-rose-500/30 transition-all">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-rose-500/5 rounded-full blur-xl group-hover:bg-rose-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Total Expenses
          </span>
          <span className="p-2 bg-rose-500/10 text-rose-400 rounded-lg text-xs font-bold">
            📉
          </span>
        </div>
        <p className="text-3xl font-extrabold text-rose-400">
          {formatPHP(totalExpenses)}
        </p>
      </div>

      {/* Net Balance Card */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:border-cyan-500/30 transition-all">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Net Balance
          </span>
          <span className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg text-xs font-bold">
            ⚖️
          </span>
        </div>
        <p className={`text-3xl font-extrabold ${netBalance >= 0 ? 'text-cyan-400' : 'text-rose-400'}`}>
          {formatPHP(netBalance)}
        </p>
      </div>
    </div>
  )
}
