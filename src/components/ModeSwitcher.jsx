import { useRef } from "react"

function getButtonClasses({ isActive, isHackerMode }) {
  const base = "rounded-full px-3 py-1.5 transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
  const focus = isHackerMode ? "focus-visible:outline-emerald-300" : "focus-visible:outline-zinc-900"

  if (isActive) {
    return isHackerMode
      ? `${base} ${focus} bg-emerald-400 text-black shadow-[0_0_16px_rgba(52,211,153,0.5)]`
      : `${base} ${focus} bg-zinc-900 text-white shadow-sm`
  }

  return isHackerMode ? `${base} ${focus} hover:text-zinc-300` : `${base} ${focus} hover:text-zinc-700`
}

export default function ModeSwitcher({ modes, value, onChange }) {
  const isHackerMode = value === "hacker"
  const tabRefs = useRef([])

  const handleKeyDown = (event, index) => {
    const offsets = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let nextIndex

    if (event.key in offsets) nextIndex = (index + offsets[event.key] + modes.length) % modes.length
    else if (event.key === "Home") nextIndex = 0
    else if (event.key === "End") nextIndex = modes.length - 1
    else return

    event.preventDefault()
    onChange(modes[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full border p-1 font-mono text-xs backdrop-blur transition-colors duration-300 sm:text-sm ${
        isHackerMode
          ? "border-emerald-500/30 bg-black/70 text-emerald-400"
          : "border-zinc-200 bg-white/80 text-zinc-500 shadow-sm"
      }`}
      role="tablist"
      aria-label="Style mode"
    >
      {modes.map(({ id, label, preload }, index) => {
        const isActive = value === id

        return (
          <button
            key={id}
            ref={(node) => { tabRefs.current[index] = node }}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            className={getButtonClasses({ isActive, isHackerMode })}
            onClick={() => onChange(id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
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
