import { useCallback, useEffect, useRef, useState } from "react"

const SKIP_KEYS = new Set(["Enter", "Escape"])

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function useTerminalIntro(command, timing) {
  const [isInstant] = useState(prefersReducedMotion)
  const [typedLength, setTypedLength] = useState(isInstant ? command.length : 0)
  const [hasResponse, setHasResponse] = useState(isInstant)
  const typewriterRef = useRef()
  const responseRef = useRef()

  const clearTimers = useCallback(() => {
    window.clearInterval(typewriterRef.current)
    window.clearTimeout(responseRef.current)
  }, [])

  useEffect(() => {
    if (isInstant) return undefined

    typewriterRef.current = window.setInterval(() => {
      setTypedLength((currentLength) => {
        const nextLength = Math.min(currentLength + 1, command.length)

        if (nextLength === command.length) {
          window.clearInterval(typewriterRef.current)
        }

        return nextLength
      })
    }, timing.typeInterval)

    responseRef.current = window.setTimeout(
      () => setHasResponse(true),
      timing.responsePause + command.length * timing.typeInterval,
    )

    return clearTimers
  }, [clearTimers, command, isInstant, timing])

  const revealResponse = useCallback(() => {
    clearTimers()
    setTypedLength(command.length)
    setHasResponse(true)
  }, [clearTimers, command.length])

  useEffect(() => {
    if (hasResponse) return undefined

    const handleKeyDown = (event) => {
      if (SKIP_KEYS.has(event.key) && !event.target.closest?.("button, a")) revealResponse()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [hasResponse, revealResponse])

  return { typedLength, hasResponse, isInstant, revealResponse }
}
