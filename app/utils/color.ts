const { min, floor } = Math

const floatTo8bit = (value: number) => min(floor(value * 256), 255)

const hue2rgb = (p: number, q: number, t: number) => {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

export const toHexRgb = (value: number) => {
  const hex = Number(value).toString(16).toUpperCase()
  if (hex.length < 2) {
    return `0${hex}`
  }
  return hex
}

export const rbgToHex = (rgb: [number, number, number]) => `#${rgb.map(v => toHexRgb(v)).join('')}`

export const hslToRgb = (h: number, s: number, l: number) => {
  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1.0 / 3.0)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1.0 / 3.0)
  }

  const result: [number, number, number] = [floatTo8bit(r), floatTo8bit(g), floatTo8bit(b)]
  return rbgToHex(result)
}

const polarize = (h) => {
  if (h > 1) {
    h -= 1
  }
  if (h < 0) {
    h += 1
  }
  return h
}

export const getComplementary = (h) => {
  return polarize(h + 1 / 2)
}

export const generateRainbowColors = (stops: number, luminosity: number, saturation: number) => {
  const gap = 1 / stops
  const colors = []
  for (let i = 0; i < stops; i++) {
    colors.push([i * gap, saturation, luminosity])
  }
  return colors
}
