import type { TabType } from '../types/budget'

interface NavbarProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'transactions', label: 'Transactions', icon: '📊' },
    { id: 'accounts', label: 'Accounts', icon: '🏦' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'goals', label: 'Goals', icon: '🎯' },
  ]

  return (
    <nav className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-2 shadow-2xl backdrop-blur-md">
      <div className="grid grid-cols-4 gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center py-3 rounded-xl font-semibold text-xs transition-all group ${
              activeTab === item.id
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span className={`text-lg mb-1 transition-transform ${activeTab === item.id ? 'scale-110' : ''}`}>
              {item.icon}
            </span>
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}