import { useCallback, useEffect, useRef, useState } from "react"

export function useTerminalIntro(command, timing) {
  const [typedLength, setTypedLength] = useState(0)
  const [hasResponse, setHasResponse] = useState(false)
  const typewriterRef = useRef()
  const responseRef = useRef()

  const clearTimers = useCallback(() => {
    window.clearInterval(typewriterRef.current)
    window.clearTimeout(responseRef.current)
  }, [])

  useEffect(() => {
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
  }, [clearTimers, command, timing])

  const revealResponse = useCallback(() => {
    clearTimers()
    setTypedLength(command.length)
    setHasResponse(true)
  }, [clearTimers, command.length])

  return { typedLength, hasResponse, revealResponse }
}
