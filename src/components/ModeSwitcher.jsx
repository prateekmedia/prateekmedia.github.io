function getButtonClasses({ isActive, isHackerMode }) {
  const base = "rounded-full px-3 py-1.5 transition-all duration-200"

  if (isActive) {
    return isHackerMode
      ? `${base} bg-emerald-400 text-black shadow-[0_0_16px_rgba(52,211,153,0.5)]`
      : `${base} bg-zinc-900 text-white shadow-sm`
  }

  return isHackerMode ? `${base} hover:text-zinc-300` : `${base} hover:text-zinc-700`
}

export default function ModeSwitcher({ modes, value, onChange }) {
  const isHackerMode = value === "hacker"

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full border p-1 font-mono text-xs backdrop-blur transition-colors duration-300 sm:text-sm ${
        isHackerMode
          ? "border-emerald-500/30 bg-black/70 text-emerald-400"
          : "border-zinc-200 bg-white/80 text-zinc-500 shadow-sm"
      }`}
      role="group"
      aria-label="Style mode"
    >
      {modes.map(({ id, label, preload }) => {
        const isActive = value === id

        return (
          <button
            key={id}
            type="button"
            aria-pressed={isActive}
            className={getButtonClasses({ isActive, isHackerMode })}
            onClick={() => onChange(id)}
            onFocus={preload}
            onPointerEnter={preload}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
