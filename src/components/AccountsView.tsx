import { useState, useMemo } from 'react'
import type { FormEvent } from 'react'
import type { Account } from '../types/budget'
import { AccountCard } from './AccountCard'

export interface AccountsViewProps {
  accounts: Account[]
  onUpdateAccountBalance: (accountId: string, newBalance: number) => void
}

export function AccountsView({ accounts, onUpdateAccountBalance }: AccountsViewProps) {
  // Modal State for Adjusting Account Balance
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [balanceInput, setBalanceInput] = useState<string>('')
  const [inputError, setInputError] = useState<string>('')

  // Net Worth & Category Aggregations
  const totalNetWorth = useMemo(() => {
    return accounts.reduce((sum, acc) => sum + acc.balance, 0)
  }, [accounts])

  const ewalletTotal = useMemo(() => {
    return accounts
      .filter((a) => a.type === 'ewallet')
      .reduce((sum, a) => sum + a.balance, 0)
  }, [accounts])

  const bankTotal = useMemo(() => {
    return accounts
      .filter((a) => a.type === 'bank')
      .reduce((sum, a) => sum + a.balance, 0)
  }, [accounts])

  const cashTotal = useMemo(() => {
    return accounts
      .filter((a) => a.type === 'cash')
      .reduce((sum, a) => sum + a.balance, 0)
  }, [accounts])

  // Handlers
  const handleOpenAdjust = (account: Account) => {
    setEditingAccount(account)
    setBalanceInput(account.balance.toString())
    setInputError('')
  }

  const handleCloseAdjust = () => {
    setEditingAccount(null)
    setBalanceInput('')
    setInputError('')
  }

  const handleSaveBalance = (e: FormEvent) => {
    e.preventDefault()
    if (!editingAccount) return

    const parsed = parseFloat(balanceInput)
    if (isNaN(parsed) || parsed < 0) {
      setInputError('Please enter a valid positive balance amount.')
      return
    }

    onUpdateAccountBalance(editingAccount.id, parsed)
    handleCloseAdjust()
  }

  return (
    <div className="space-y-6">
      {/* Zone 1: Net Worth Hero Summary Banner */}
      <div className="bg-linear-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden shadow-xl">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400">
            Total Liquid Net Worth
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-100 flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl text-slate-400">₱</span>
            <span>
              {totalNetWorth.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        {/* Sub-category Pill Badges */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-800/70 border border-slate-700/60 px-3 py-1.5 rounded-xl">
            <span>📱</span>
            <span className="text-slate-400">E-Wallets:</span>
            <span className="font-semibold font-mono text-slate-200">
              ₱{ewalletTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800/70 border border-slate-700/60 px-3 py-1.5 rounded-xl">
            <span>🏦</span>
            <span className="text-slate-400">Banks:</span>
            <span className="font-semibold font-mono text-slate-200">
              ₱{bankTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800/70 border border-slate-700/60 px-3 py-1.5 rounded-xl">
            <span>💵</span>
            <span className="text-slate-400">Cash:</span>
            <span className="font-semibold font-mono text-slate-200">
              ₱{cashTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <span className="text-slate-500 ml-auto hidden sm:inline text-[11px]">
            {accounts.length} Connected Accounts
          </span>
        </div>
      </div>

      {/* Zone 2: Account Cards Responsive Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <span>🏦</span> Your Connected Wallets & Accounts
          </h3>
          <span className="text-xs text-slate-400">
            Click 'Adjust Balance' to update any wallet
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onAdjustBalance={handleOpenAdjust}
            />
          ))}
        </div>
      </div>

      {/* Zone 3: Interactive Balance Adjustment Modal */}
      {editingAccount && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{editingAccount.icon}</span>
                <div>
                  <h4 className="font-semibold text-slate-100 text-sm">
                    Adjust Balance — {editingAccount.name}
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    Update current balance in your {editingAccount.name} wallet
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseAdjust}
                className="text-slate-500 hover:text-slate-300 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBalance} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  New Available Balance (₱)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">
                    ₱
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    autoFocus
                    value={balanceInput}
                    onChange={(e) => {
                      setBalanceInput(e.target.value)
                      setInputError('')
                    }}
                    placeholder="0.00"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
                {inputError && (
                  <p className="text-rose-400 text-xs mt-1">{inputError}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleCloseAdjust}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-linear-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
