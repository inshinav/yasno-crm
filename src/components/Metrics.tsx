import { CornerDownRight, Ban } from 'lucide-react'
import { metricGroups, antiMetrics } from '../data/metrics'
import { SectionHeader } from './SectionHeader'
import { Reveal, Stagger, StaggerItem } from './Reveal'

export function Metrics() {
  return (
    <section id="metrics" className="scroll-mt-8 border-t border-line bg-surface/40 py-20 sm:py-28">
      <div className="shell">
        <SectionHeader
          index="06"
          kicker="Метрики"
          title="Метрики исхода, а не тщеславия"
          intro="Дерево KPI растёт из реального исхода терапии. Выручка — лист на этом дереве, а не корень."
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {metricGroups.map((g) => {
            const accent = g.care ? 'var(--care)' : g.key === 'revenue' ? 'var(--clay)' : 'var(--blue)'
            const accentInk = g.care
              ? 'var(--care-deep)'
              : g.key === 'revenue'
                ? 'var(--clay-deep)'
                : 'var(--blue-deep)'
            return (
              <StaggerItem key={g.key}>
                <article className="card h-full p-6" style={{ borderTop: `3px solid ${accent}` }}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="eyebrow" style={{ color: accentInk }}>
                      {g.label}
                    </span>
                    {g.key === 'revenue' && (
                      <CornerDownRight size={15} className="text-clay-deep" aria-hidden />
                    )}
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {g.items.map((m) => (
                      <li
                        key={m.label}
                        className={`data-mono text-[0.86rem] leading-snug ${
                          m.primary ? 'font-medium text-ink' : 'text-ink-soft'
                        }`}
                      >
                        <span
                          className={`mr-2 inline-block translate-y-[-1px] rounded-full align-middle ${
                            m.primary ? 'h-2 w-2' : 'h-1.5 w-1.5 opacity-60'
                          }`}
                          style={{ background: accent }}
                          aria-hidden
                        />
                        {m.label}
                        {m.primary && (
                          <span
                            className="ml-2 not-italic text-[0.66rem] uppercase tracking-wide"
                            style={{ color: accentInk }}
                          >
                            главная
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  {g.tail && (
                    <p className="mt-4 border-t border-line pt-3 text-[0.8rem] italic text-ink-soft">
                      {g.tail}
                    </p>
                  )}
                </article>
              </StaggerItem>
            )
          })}
        </Stagger>

        {/* Anti-metrics */}
        <Reveal className="mt-8">
          <div className="rounded-card border border-dashed border-clay/40 bg-paper/60 p-6 sm:p-7">
            <div className="flex items-center gap-2.5">
              <Ban size={17} className="text-clay-deep" aria-hidden />
              <h3 className="data-mono text-[0.78rem] uppercase tracking-wider text-clay-deep">
                не оптимизируем
              </h3>
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {antiMetrics.map((a) => (
                <li
                  key={a}
                  className="text-[0.95rem] text-ink-soft line-through decoration-clay/50"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
