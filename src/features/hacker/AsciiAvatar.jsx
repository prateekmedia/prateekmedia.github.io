import { useEffect, useState } from "react"

const BRIGHTNESS_RAMP = "@%#*+=~-:. "

function pixelsToAscii(pixelData, columns, rows) {
  const lines = []

  for (let y = 0; y < rows; y += 1) {
    let line = ""

    for (let x = 0; x < columns; x += 1) {
      const pixelIndex = (y * columns + x) * 4
      const luminance = (
        0.2126 * pixelData[pixelIndex]
        + 0.7152 * pixelData[pixelIndex + 1]
        + 0.0722 * pixelData[pixelIndex + 2]
      ) / 255
      const rampIndex = Math.min(
        BRIGHTNESS_RAMP.length - 1,
        Math.floor((1 - luminance) * BRIGHTNESS_RAMP.length),
      )

      line += BRIGHTNESS_RAMP[rampIndex]
    }

    lines.push(line.trimEnd())
  }

  return lines
}

function useAsciiImage(source, columns) {
  const [lines, setLines] = useState([])

  useEffect(() => {
    let isCancelled = false
    const image = new Image()

    image.crossOrigin = "anonymous"
    image.onload = () => {
      if (isCancelled) return

      const rows = Math.max(1, Math.round((image.height / image.width) * columns))
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
