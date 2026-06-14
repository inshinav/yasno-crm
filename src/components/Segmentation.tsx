import { ArrowRight, LifeBuoy } from 'lucide-react'
import { rfmAxes, stateAxes, sameClient } from '../data/segmentation'
import { stateTints } from '../data/journey'
import { SectionHeader } from './SectionHeader'
import { Reveal, Stagger, StaggerItem } from './Reveal'

export function Segmentation() {
  return (
    <section id="segmentation" className="scroll-mt-8 py-20 sm:py-28">
      <div className="shell">
        <SectionHeader
          index="03"
          kicker="Сегментация"
          title="Сегментация по состоянию, а не по RFM"
          intro="Не «давно / часто / много платил», а на какой стадии пути человек, насколько крепок альянс с терапевтом и какие сигналы оттока мы видим."
        />

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1.2fr]">
          {/* RFM — зачёркнуто */}
          <Reveal className="h-full">
            <div className="card h-full bg-surface/50 p-6 sm:p-7">
              <span className="eyebrow text-clay-deep">ось e-com</span>
              <h3 className="mt-3 text-lg font-semibold text-ink-soft">RFM-сегментация</h3>
              <ul className="mt-5 space-y-3">
                {rfmAxes.map((a) => (
                  <li key={a} className="text-[0.95rem] text-ink-soft line-through decoration-clay/60">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* стрелка */}
          <div className="flex items-center justify-center lg:px-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-blue">
              <ArrowRight size={18} aria-hidden />
            </span>
          </div>

          {/* Наши оси */}
          <Reveal className="h-full" delay={0.08}>
            <div className="card h-full p-6 sm:p-7" style={{ borderLeft: '3px solid var(--blue)' }}>
              <span className="eyebrow text-blue-deep">наши оси</span>
              <h3 className="mt-3 text-lg font-semibold text-ink">Состояние и альянс</h3>
              <dl className="mt-5 grid gap-x-4 gap-y-3 sm:grid-cols-[8.5rem_1fr]">
                {stateAxes.map((a) => (
                  <div key={a.key} className="contents">
                    <dt className="data-mono text-[0.72rem] uppercase tracking-wide text-blue-deep">
                      {a.key}
                    </dt>
                    <dd className="text-[0.95rem] leading-snug text-ink">{a.desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        {/* Один клиент — разные каскады */}
        <div className="mt-14">
          <Reveal>
            <p className="eyebrow text-ink-soft">один клиент — разные каскады</p>
            <h3 className="mt-4 max-w-2xl text-xl font-semibold text-ink">{sameClient.who}</h3>
            <p className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed text-ink-soft">
              {sameClient.note}
            </p>
          </Reveal>

          <Stagger className="mt-7 grid gap-5 md:grid-cols-3" gap={0.1}>
            {sameClient.branches.map((b) => {
              const tint = stateTints[b.tint]
              return (
                <StaggerItem key={b.state}>
                  <article
                    className="card h-full p-6"
                    style={{ borderTop: `3px solid ${tint}` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: tint }} aria-hidden />
                      <span className="data-mono text-[0.7rem] uppercase tracking-wide text-ink-soft">
                        состояние
                      </span>
                    </div>
                    <p className="mt-2 text-[0.98rem] font-medium leading-snug text-ink">{b.state}</p>
                    <div className="mt-4 border-t border-line pt-4">
                      <span className="data-mono text-[0.7rem] uppercase tracking-wide text-ink-soft">
                        каскад
                      </span>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{b.cascade}</p>
                    </div>
                  </article>
                </StaggerItem>
              )
            })}
          </Stagger>

          {/* Crisis-override: молчание ≠ брошенная корзина */}
          <Reveal className="mt-5" delay={0.05}>
            <div
              className="flex items-start gap-3 rounded-card border border-care/30 bg-care/[0.07] p-5"
              style={{ borderLeft: '3px solid var(--care)' }}
            >
              <LifeBuoy size={18} className="mt-0.5 shrink-0 text-care-deep" aria-hidden />
              <p className="text-[0.95rem] leading-relaxed text-ink">{sameClient.crisisNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
