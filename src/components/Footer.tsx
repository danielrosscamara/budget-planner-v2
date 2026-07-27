export function Footer() {
  return (
    <footer className="w-full text-center py-8 mt-12 border-t border-slate-800/60 text-slate-500 text-xs space-y-3">
      {/* Tech Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md font-medium">
          React 19
        </span>
        <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md font-medium">
          TypeScript
        </span>
        <span className="px-2.5 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-md font-medium">
          Tailwind CSS v4
        </span>
        <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md font-medium">
          Vite 8
        </span>
      </div>

      {/* Developer Profile Credit */}
      <p className="text-slate-400 font-medium">
        Designed & Developed by <span className="text-slate-200 font-bold">Daniel Ross B. Camara</span>
      </p>
      
      <p className="text-slate-500 text-[11px]">
        BS Computer Engineering • STI College Novaliches (June 2026)
      </p>

      {/* GitHub Repository Link */}
      <div className="pt-1">
        <a
          href="https://github.com/danielrosscamara/budget-planner-v2"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all text-xs font-semibold shadow-sm"
        >
          <span>🐙</span> View Repository on GitHub
        </a>
      </div>
    </footer>
  )
}
