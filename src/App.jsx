import { Suspense, useEffect, useState } from "react"
import ModeSwitcher from "./components/ModeSwitcher"
import { DEFAULT_MODE, findMode, MODE_OPTIONS } from "./config/modes"

export default function App() {
  const [modeId, setModeId] = useState(DEFAULT_MODE.id)
  const { View: ActiveView } = findMode(modeId)

  useEffect(() => {
    document.documentElement.dataset.mode = modeId
  }, [modeId])

  return (
    <>
      <ModeSwitcher modes={MODE_OPTIONS} value={modeId} onChange={setModeId} />
      <Suspense fallback={null}>
        <ActiveView />
      </Suspense>
    </>
  )
}
