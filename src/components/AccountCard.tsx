import type { Account } from '../types/budget'

export interface AccountCardProps {
  account: Account
  onAdjustBalance?: (account: Account) => void
}

const TYPE_LABELS: Record<Account['type'], string> = {
  ewallet: 'E-Wallet',
  bank: 'Bank Account',
  cash: 'Cash',
  savings: 'Savings',
}

export function AccountCard({ account, onAdjustBalance }: AccountCardProps) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all duration-200 relative overflow-hidden flex flex-col justify-between space-y-4 group">
      {/* Top Accent Color Line */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: account.color }}
      />

      {/* Card Header: Icon, Name & Type Badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 border border-slate-700/60"
            style={{ backgroundColor: `${account.color}15` }}
          >
            {account.icon}
          </div>
          <div>
            <h4 className="font-semibold text-slate-200 text-sm">{account.name}</h4>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
              {TYPE_LABELS[account.type]}
            </span>
          </div>
        </div>

        {/* Account Number or Identifier */}
        {account.accountNumber && (
          <span className="text-xs font-mono text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/50">
            {account.accountNumber}
          </span>
        )}
      </div>

      {/* Balance Display */}
      <div className="space-y-1">
        <span className="text-[11px] text-slate-400 font-medium">Available Balance</span>
        <div className="text-2xl font-bold font-mono text-slate-100 flex items-baseline gap-1">
          <span className="text-lg text-slate-400">₱</span>
          <span>{account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      {/* Action Bar */}
      {onAdjustBalance && (
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end">
          <button
            type="button"
            onClick={() => onAdjustBalance(account)}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-800/60"
          >
            <span>✏️</span> Adjust Balance
          </button>
        </div>
      )}
    </div>
  )
}
