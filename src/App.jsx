import { Suspense, useEffect, useState } from "react"
import ModeSwitcher from "./components/ModeSwitcher"
import { DEFAULT_MODE, findMode, isModeId, MODE_OPTIONS } from "./config/modes"

const STORAGE_KEY = "mode"

function readHashMode() {
  const modeId = window.location.hash.slice(1)
  return isModeId(modeId) ? modeId : null
}

function readStoredMode() {
  try {
    const modeId = window.localStorage.getItem(STORAGE_KEY)
    return isModeId(modeId) ? modeId : null
  } catch {
    return null
  }
}

function getInitialMode() {
  return readHashMode() ?? readStoredMode() ?? DEFAULT_MODE.id
}

export default function App() {
  const [modeId, setModeId] = useState(getInitialMode)
  const { View: ActiveView, title, themeColor } = findMode(modeId)

  useEffect(() => {
    const handleHashChange = () => {
      const hashMode = readHashMode()
      if (hashMode) setModeId(hashMode)
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.mode = modeId
    document.title = title
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor)

    if (window.location.hash !== `#${modeId}`) {
      window.history.replaceState(null, "", `#${modeId}`)
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, modeId)
    } catch {
      // Storage can be unavailable (private mode, disabled cookies).
    }
  }, [modeId, title, themeColor])

  return (
    <>
      <a
        href={`#${modeId}`}
        onClick={(event) => {
          event.preventDefault()
          const main = document.querySelector("main")
          main?.setAttribute("tabindex", "-1")
          main?.focus()
        }}
        className="sr-only z-[60] rounded bg-zinc-900 px-3 py-2 font-sans text-sm text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <ModeSwitcher modes={MODE_OPTIONS} value={modeId} onChange={setModeId} />
      <Suspense fallback={null}>
        <ActiveView />
      </Suspense>
    </>
  )
}
