export function Header() {
  return (
    <header className="text-center space-y-3">
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Personal Finance Tracker
      </div>

      {/* Main Gradient Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent tracking-tight">
        Budget Planner v2
      </h1>

      {/* Subtitle */}
      <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
        Track your income, manage expenses, and monitor your net balance in real time.
      </p>
    </header>
  )
}
