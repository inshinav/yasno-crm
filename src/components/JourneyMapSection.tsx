import { useState, type Dispatch, type SetStateAction } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'
import { stages, stateTints } from '../data/journey'
import { soft } from '../lib/motion'
import { SectionHeader } from './SectionHeader'
import { JourneySnake } from './JourneySnake'
import { StageCascade } from './StageCascade'

type Props = {
  // Выбранная стадия поднята в App — клик в герое открывает её здесь.
  pinned: number | null
  setPinned: Dispatch<SetStateAction<number | null>>
}

export function JourneyMapSection({ pinned, setPinned }: Props) {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState<number | null>(null)

  const desktopActive = hovered ?? pinned ?? 5
  const activeStage = stages.find((s) => s.n === desktopActive)!

  return (
    <section id="journey" className="scroll-mt-8 py-20 sm:py-28">
      <div className="shell">
        <SectionHeader
          index="02"
          kicker="Путь клиента"
          title="Карта терапевтического пути"
          intro="Одиннадцать стадий — это эмоциональные стадии человека в терапии, а не этапы воронки. Каждая раскрывается в каскад: состояние → риск → цель → канал → тон → метрика."
        />

        {/* ───── Десктоп: змейка + каскад ───── */}
        <div className="mt-10 hidden md:block">
          <p className="eyebrow mb-4 flex items-center gap-2 text-ink-soft">
            наведите курсором на узел или выберите его
            <span className="hairline ml-2 max-w-[120px] flex-1" />
          </p>

          <div className="rounded-card border border-line bg-surface/60 px-6 pb-10 pt-12 paper-grain">
            <JourneySnake
              active={desktopActive}
              onHover={setHovered}
              onSelect={(n) => setPinned(n)}
              drawTrigger="inView"
              showLabels
            />
          </div>

          <div className="mt-6 max-w-2xl">
            {/* keyed crossfade без mode="wait": переключение мгновенно и
               отзывчиво на hover; стартовая opacity 0.5 — деградирует мягко. */}
            <motion.div
              key={activeStage.n}
              initial={reduce ? false : { opacity: 0.5, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: soft }}
            >
              <StageCascade stage={activeStage} />
            </motion.div>
          </div>
        </div>

        {/* ───── Мобайл: вертикальная дорожка, tap-to-expand ───── */}
        <div className="mt-10 md:hidden">
          <p className="eyebrow mb-5 text-ink-soft">нажмите на стадию</p>
          <ol className="relative">
            {stages.map((s, i) => {
              const tint = stateTints[s.tint]
              const isOpen = pinned === s.n
              const isFirst = i === 0
              const isLast = i === stages.length - 1
              return (
                <li key={s.key} className="relative">
                  <button
                    type="button"
                    onClick={() => setPinned((p) => (p === s.n ? null : s.n))}
                    aria-expanded={isOpen}
                    aria-label={`Стадия ${s.n}: ${s.label}${s.critical ? '. Критическая активация' : ''}`}
                    className="flex w-full items-center gap-3 py-3 text-left"
                  >
                    {/* рельса + узел (выровнены через items-center, без магических отступов) */}
                    <span className="relative flex w-6 shrink-0 items-center justify-center self-stretch">
                      <span
                        className="absolute w-px bg-line"
                        style={{ top: isFirst ? '50%' : 0, bottom: isLast ? '50%' : 0 }}
                      />
                      <span
                        className="relative h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-paper"
                        style={{ background: tint }}
                      />
                    </span>

                    <span className="data-mono text-[0.7rem] text-ink-soft">
                      {String(s.n).padStart(2, '0')}
                    </span>
                    <span
                      className={`flex flex-1 items-center gap-2 ${
                        isOpen ? 'font-semibold text-ink' : 'text-ink'
                      }`}
                    >
                      {s.label}
                      {s.critical && (
                        <Star size={13} className="text-blue-deep" aria-hidden style={{ fill: 'currentColor' }} />
                      )}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-ink-soft transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: soft }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 pl-9 pt-1">
                          <StageCascade stage={s} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
