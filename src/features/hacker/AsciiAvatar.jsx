import { useEffect, useState } from "react"
import { asciiRows, pixelsToAscii } from "./ascii"

function useAsciiImage(source, columns) {
  const [lines, setLines] = useState([])

  useEffect(() => {
    let isCancelled = false
    const image = new Image()

    image.crossOrigin = "anonymous"
    image.onload = () => {
      if (isCancelled) return

      const rows = asciiRows(image.width, image.height, columns)
      const canvas = document.createElement("canvas")
      canvas.width = columns
      canvas.height = rows
      const context = canvas.getContext("2d")

      if (!context) return

      context.drawImage(image, 0, 0, columns, rows)

      try {
        const { data } = context.getImageData(0, 0, columns, rows)
        setLines(pixelsToAscii(data, columns, rows))
      } catch {
        setLines([])
      }
    }
    image.onerror = () => {
      if (!isCancelled) setLines([])
    }
    image.src = source

    return () => {
      isCancelled = true
    }
  }, [source, columns])

  return lines
}

export default function AsciiAvatar({ source, columns, startDelay, lineDelay }) {
  const lines = useAsciiImage(source, columns)

  if (lines.length === 0) return null

  return (
    <div aria-hidden="true" className="ascii-glow my-4 w-fit text-[7px] leading-[0.6] sm:text-[8px]">
      {lines.map((line, index) => (
        <div
          key={`${index}-${line}`}
          className="line-in whitespace-pre text-emerald-600"
          style={{ animationDelay: `${startDelay + index * lineDelay}ms` }}
        >
          {line}
        </div>
      ))}
    </div>
  )
}
