import { phases } from '../data/roadmap'
import { SectionHeader } from './SectionHeader'
import { Stagger, StaggerItem } from './Reveal'

const accents = ['var(--blue)', 'var(--blue)', 'var(--care)']
const accentInk = ['var(--blue-deep)', 'var(--blue-deep)', 'var(--care-deep)']

export function Roadmap() {
  return (
    <section id="roadmap" className="scroll-mt-8 border-t border-line bg-surface/40 py-20 sm:py-28">
      <div className="shell">
        <SectionHeader
          index="08"
          kicker="Роадмап"
          title="Разворачиваем слоями — от quick wins к предиктиву"
          intro="Сначала самые хрупкие переходы и базовый тон, затем система сегментации и re-match, в конце — AI и предиктив."
        />

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3" gap={0.1}>
          {phases.map((p, i) => {
            // Гард: акценты не «отваливаются», если фаз станет больше трёх.
            const accent = accents[i] ?? 'var(--blue)'
            const ink = accentInk[i] ?? 'var(--blue-deep)'
            return (
              <StaggerItem key={p.n}>
                <article className="card relative flex h-full flex-col p-6 sm:p-7" style={{ borderTop: `3px solid ${accent}` }}>
                  <div className="flex items-baseline justify-between">
                    <span className="data-mono text-[0.72rem] uppercase tracking-wider" style={{ color: ink }}>
                      {p.tag}
                    </span>
                    <span
                      className="data-mono text-3xl font-semibold leading-none opacity-15"
                      style={{ color: ink }}
                      aria-hidden
                    >
                      {String(p.n).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-ink">{p.name}</h3>
                  <ul className="mt-5 space-y-2.5">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[0.95rem] leading-snug text-ink-soft">
                        <span
                          className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: accent }}
                          aria-hidden
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
