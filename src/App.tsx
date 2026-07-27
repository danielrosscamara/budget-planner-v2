function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
        <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent mb-2">
          Budget Planner v2
        </h1>
        <p className="text-slate-400 text-sm mb-6">
          Tailwind CSS & React setup successfully verified!
        </p>
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-full text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Ready for Phase 2: State & Components
        </div>
      </div>
    </div>
  )
}

export default App
