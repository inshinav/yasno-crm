import { Fragment } from 'react'
import { Star } from 'lucide-react'
import { cascadeOrder, stateTints, type Stage } from '../data/journey'

// Каскад выбранной стадии: состояние → риск → цель → канал → тон → метрика.
export function StageCascade({ stage }: { stage: Stage }) {
  const tint = stateTints[stage.tint]
  const rows = cascadeOrder
    .map(({ key, label }) => ({ label, value: stage[key] as string | undefined, key }))
    .filter((r) => Boolean(r.value))

  return (
    <div
      className="card h-full p-6 sm:p-7"
      style={{ borderLeft: `3px solid ${tint}` }}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="data-mono text-xs uppercase tracking-wider text-ink-soft">
          стадия {String(stage.n).padStart(2, '0')}
        </span>
        <h3 className="text-xl font-semibold text-ink">{stage.label}</h3>
        {stage.critical && (
          <span className="chip border-blue/40 bg-blue/[0.08] text-blue-deep">
            <Star size={12} className="fill-current" aria-hidden />
            критическая активация
          </span>
        )}
      </div>

      <dl className="mt-5 grid grid-cols-[5rem_1fr] gap-x-4 gap-y-3 sm:grid-cols-[5.5rem_1fr]">
        {rows.map((r) => {
          const isRisk = r.key === 'risk'
          const isMetric = r.key === 'metric'
          return (
            <Fragment key={r.key}>
              <dt className="data-mono pt-0.5 text-[0.68rem] uppercase tracking-wider text-ink-soft">
                {r.label}
              </dt>
              <dd
                className={
                  isMetric
                    ? 'data-mono text-[0.92rem] leading-snug text-ink'
                    : isRisk
                      ? 'text-[0.96rem] leading-snug text-clay-deep'
                      : 'text-[0.96rem] leading-snug text-ink'
                }
              >
                {isMetric && (
                  <span
                    className="mr-2 inline-block h-2 w-2 translate-y-[-1px] rounded-full align-middle"
                    style={{ background: tint }}
                    aria-hidden
                  />
                )}
                {r.value}
              </dd>
            </Fragment>
          )
        })}
      </dl>
    </div>
  )
}
