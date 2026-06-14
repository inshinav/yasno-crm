import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { nodePercents, nodePoints, pathD, VIEW } from '../lib/journeyGeometry'
import { soft, viewportOnce } from '../lib/motion'
import { stages, stateTints } from '../data/journey'

type Props = {
  active: number | null
  onHover?: (n: number | null) => void
  onSelect?: (n: number) => void
  drawTrigger?: 'mount' | 'inView'
  compact?: boolean
  showLabels?: boolean
}

const pathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0.25 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.15, ease: soft } },
}

const dotsParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
}

const dotVariant: Variants = {
  hidden: { scale: 0.2, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: soft } },
}

// Презентационная «змейка»: SVG-дорожка + цветные узлы + HTML-оверлей для кликов/фокуса.
// Используется и в герое (compact, draw on mount), и в ядре (полные лейблы, draw on inView).
export function JourneySnake({
  active,
  onHover,
  onSelect,
  drawTrigger = 'inView',
  compact = false,
  showLabels = false,
}: Props) {
  const reduce = useReducedMotion()
  const baseR = compact ? 6.5 : 8.5

  // Один триггер для дорожки и узлов: на маунте (герой) или при появлении в зоне (ядро).
  const anim = reduce
    ? { animate: 'show' as const }
    : drawTrigger === 'mount'
      ? { initial: 'hidden' as const, animate: 'show' as const }
      : { initial: 'hidden' as const, whileInView: 'show' as const, viewport: viewportOnce }

  return (
    <div className="relative w-full" style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}>
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        role="presentation"
      >
        {/* Гладкая дорожка — рисуется на загрузке/появлении */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="var(--ink)"
          strokeOpacity={0.16}
          strokeWidth={compact ? 2 : 2.5}
          strokeLinecap="round"
          variants={reduce ? undefined : pathVariants}
          {...(reduce ? {} : anim)}
        />

        {/* Узлы */}
        <motion.g variants={reduce ? undefined : dotsParent} {...(reduce ? {} : anim)}>
          {nodePoints.map((p, i) => {
            const s = stages[i]
            const tint = stateTints[s.tint]
            const isActive = active === s.n
            const isCritical = Boolean(s.critical)
            return (
              <g key={s.key} transform={`translate(${p.x} ${p.y})`}>
                <motion.g
                  variants={reduce ? undefined : dotVariant}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                >
                  {/* кольцо критической стадии — всегда видно */}
                  {isCritical && (
                    <circle
                      r={baseR + 7}
                      fill="none"
                      stroke="var(--blue)"
                      strokeOpacity={0.55}
                      strokeWidth={1.5}
                      strokeDasharray="3 3"
                    />
                  )}
                  {/* кольцо активного узла */}
                  <motion.circle
                    r={baseR + 4.5}
                    fill="none"
                    stroke={tint}
                    strokeWidth={1.75}
                    initial={false}
                    animate={{ opacity: isActive ? 0.9 : 0, scale: isActive ? 1 : 0.6 }}
                    transition={{ duration: 0.3, ease: soft }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  />
                  <circle r={baseR} fill={tint} />
                  {/* мягкая сердцевина для глубины */}
                  <circle r={baseR - 4} fill="var(--paper)" fillOpacity={0.32} />
                  {isCritical && (
                    <text
                      y={-(baseR + 13)}
                      textAnchor="middle"
                      fill="var(--blue)"
                      fontSize={compact ? 12 : 14}
                    >
                      ★
                    </text>
                  )}
                </motion.g>
              </g>
            )
          })}
        </motion.g>
      </svg>

      {/* HTML-оверлей: фокусируемые кнопки + (опц.) лейблы */}
      <div className="absolute inset-0">
        {stages.map((s, i) => {
          const p = nodePercents[i]
          const above = i < 6
          const isActive = active === s.n
          return (
            <button
              key={s.key}
              type="button"
              aria-label={`Стадия ${s.n}: ${s.label}. ${s.mood}${s.critical ? '. Критическая активация' : ''}`}
              aria-pressed={isActive}
              onMouseEnter={() => onHover?.(s.n)}
              onMouseLeave={() => onHover?.(null)}
              onFocus={() => onHover?.(s.n)}
              onClick={() => onSelect?.(s.n)}
              className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full"
              style={{ left: `${p.left}%`, top: `${p.top}%` }}
            >
              {showLabels && (
                <span
                  className={`pointer-events-none absolute left-1/2 w-[5.6rem] -translate-x-1/2 text-center text-[0.7rem] leading-tight transition-colors ${
                    above ? 'bottom-full mb-2' : 'top-full mt-2'
                  } ${isActive ? 'font-semibold text-ink' : 'text-ink-soft'}`}
                >
                  <span className="data-mono mr-1 opacity-60">{String(s.n).padStart(2, '0')}</span>
                  {s.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
