import type { Transaction } from '../types/budget'

interface TransactionItemProps {
  transaction: Transaction
  onDelete: (id: string) => void
}

export function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const isIncome = transaction.type === 'income'

  const formatPHP = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount)
  }

  return (
    <div className="flex items-center justify-between p-4 bg-slate-950/70 border border-slate-800/60 rounded-xl hover:border-slate-700/80 transition-all group shadow-sm">
      <div className="flex items-center gap-3.5">
        {/* Type Icon Badge */}
        <div
          className={`p-2.5 rounded-xl text-sm font-bold flex items-center justify-center ${
            isIncome
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}
        >
          {isIncome ? '📈' : '📉'}
        </div>

        {/* Title & Metadata */}
        <div>
          <p className="font-semibold text-slate-200 text-sm group-hover:text-white transition-colors">
            {transaction.title}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
              {transaction.category}
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-500">{transaction.date}</span>
          </div>
        </div>
      </div>

      {/* Amount & Delete Action */}
      <div className="flex items-center gap-4">
        <span
          className={`font-bold text-sm tracking-wide ${
            isIncome ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {isIncome ? '+' : '-'}{formatPHP(transaction.amount)}
        </span>

        <button
          onClick={() => onDelete(transaction.id)}
          title="Delete transaction"
          className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 rounded-lg transition-all text-xs font-medium cursor-pointer"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}
