const BRIGHTNESS_RAMP = "@%#*+=~-:. "

export const TERMINAL_CELL_ASPECT = 0.5

export function asciiRows(width, height, columns, cellAspect = 1) {
  return Math.max(1, Math.round((height / width) * columns * cellAspect))
}

export function pixelsToAscii(pixelData, columns, rows) {
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
