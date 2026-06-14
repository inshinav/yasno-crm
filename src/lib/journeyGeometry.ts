// Геометрия «змейки» карты пути — общая для героя и ядра.
// Boustrophedon: ряд 1 слева-направо (1..6), плавный разворот, ряд 2 справа-налево (7..11).

export const VIEW = { w: 1024, h: 320 }

const ROW1_Y = 78
const ROW2_Y = 214
const PAD_X = 92

export type Pt = { x: number; y: number }

function row(count: number, y: number, leftToRight: boolean): Pt[] {
  const left = PAD_X
  const right = VIEW.w - PAD_X
  const step = (right - left) / (count - 1)
  return Array.from({ length: count }, (_, i) => {
    const xi = leftToRight ? left + step * i : right - step * i
    return { x: Math.round(xi * 10) / 10, y }
  })
}

// 6 узлов в верхнем ряду, 5 в нижнем = 11.
export const nodePoints: Pt[] = [...row(6, ROW1_Y, true), ...row(5, ROW2_Y, false)]

// Catmull-Rom → кубические безье: гладкая «дорожка» сквозь все узлы.
export function smoothPath(pts: Pt[], tension = 0.45): string {
  if (pts.length < 2) return ''
  const d: string[] = [`M ${pts[0].x} ${pts[0].y}`]
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension * 2
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension * 2
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension * 2
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension * 2
    d.push(`C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)} ${cp2x.toFixed(1)} ${cp2y.toFixed(1)} ${p2.x} ${p2.y}`)
  }
  return d.join(' ')
}

export const pathD = smoothPath(nodePoints)

// % координаты для HTML-оверлея (кнопки, лейблы) поверх SVG.
export const nodePercents = nodePoints.map((p) => ({
  left: (p.x / VIEW.w) * 100,
  top: (p.y / VIEW.h) * 100,
}))
