import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { stages } from '../data/journey'
import { soft } from '../lib/motion'
import { JourneySnake } from './JourneySnake'

export function Hero({ onPickStage }: { onPickStage: (n: number) => void }) {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState<number | null>(null)
  const active = stages.find((s) => s.n === (hovered ?? 5))!

  const scrollToJourney = () => {
    document
      .getElementById('journey')
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: soft, delay },
        }

  return (
    <header className="relative overflow-hidden">
      {/* слабый бумажный фон */}
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-70" aria-hidden />

      {/* тонкая шапка — внутренний документ */}
      <div className="shell relative flex items-center justify-between py-5">
        <span className="data-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink-soft">
          Ясно · команда роста
        </span>
        <span className="data-mono hidden text-[0.72rem] uppercase tracking-[0.2em] text-ink-soft sm:block">
          внутренний документ
        </span>
      </div>
      <div className="hairline" />

      <div className="shell relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24">
        {/* Текст */}
        <div>
          <motion.p className="eyebrow text-blue-deep" {...rise(0)}>
            CRM strategy · Ясно
          </motion.p>

          <motion.h1
            className="mt-6 text-[clamp(2.1rem,6vw,3.7rem)] font-semibold leading-[1.03] text-ink"
            {...rise(0.08)}
          >
            CRM как сопровождение,
            <br />
            <span className="text-blue">а не как продажи.</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-ink-soft"
            {...rise(0.18)}
          >
            CRM для терапии нельзя строить как для e-com. Мы ведём клиента по пути, а не
            выжимаем из контакта.
          </motion.p>

          <motion.button
            type="button"
            onClick={scrollToJourney}
            className="group mt-9 inline-flex items-center gap-2 text-sm font-medium text-blue-deep"
            {...rise(0.28)}
          >
            <span className="border-b border-blue-deep/30 pb-0.5 transition-colors group-hover:border-blue-deep">
              посмотреть карту пути
            </span>
            <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" aria-hidden />
          </motion.button>
        </div>

        {/* Сигнатурная карта */}
        <motion.div {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay: 0.1 } })}>
          <div className="rounded-card border border-line bg-surface/50 px-4 py-8 sm:px-7 sm:py-10">
            <p className="eyebrow mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-soft">
              карта терапевтического пути
              <span className="opacity-40">·</span>
              <span className="text-blue-deep">наведите на узел</span>
            </p>
            <JourneySnake
              active={hovered ?? 5}
              onHover={setHovered}
              onSelect={(n) => {
                onPickStage(n)
                scrollToJourney()
              }}
              drawTrigger="mount"
              compact
            />
            {/* живая подпись активного узла */}
            <div className="mt-7 flex min-w-0 items-baseline gap-3 border-t border-line pt-5">
              <span className="data-mono text-sm text-ink-soft">
                {String(active.n).padStart(2, '0')}
              </span>
              <span className="shrink-0 text-[0.98rem] font-medium text-ink">{active.label}</span>
              <span className="min-w-0 truncate text-[0.92rem] text-ink-soft">— {active.mood}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
