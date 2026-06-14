import { ArrowRight, X } from 'lucide-react'
import { shifts } from '../data/shifts'
import { SectionHeader } from './SectionHeader'
import { Reveal, Stagger, StaggerItem } from './Reveal'

export function Manifesto() {
  return (
    <section id="manifesto" className="scroll-mt-8 border-t border-line bg-surface/40 py-20 sm:py-28">
      <div className="shell">
        <SectionHeader
          index="01"
          kicker="Почему терапия ≠ e-com"
          title="Терапия — это пролонг. Ценность раскрывается за серию сессий, а не за одну."
        />
        <Reveal>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">
            Поэтому ургентность, FOMO, «скидка только сегодня» и брошенная корзина здесь не просто
            off-brand. В ментальном здоровье они способны навредить человеку и подорвать доверие. Мы
            меняем рамку в четырёх местах.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2" gap={0.1}>
          {shifts.map((s) => (
            <StaggerItem key={s.n}>
              <article className="card flex h-full flex-col p-6 sm:p-7">
                <span className="eyebrow text-ink-soft">
                  сдвиг {String(s.n).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-ink">
                  От <span className="text-ink-soft">{s.from}</span>
                  <br className="hidden sm:block" /> к <span className="text-blue-deep">{s.to}</span>
                </h3>

                <div className="mt-5 space-y-2.5 text-[0.92rem]">
                  <div className="flex items-start gap-2.5 text-ink-soft">
                    <X size={15} className="mt-0.5 shrink-0 text-clay-deep" aria-hidden />
                    <span>
                      <span className="data-mono mr-1.5 text-[0.7rem] uppercase tracking-wide text-clay-deep">
                        e-com
                      </span>
                      {s.ecom}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-ink">
                    <ArrowRight size={15} className="mt-0.5 shrink-0 text-blue" aria-hidden />
                    <span>
                      <span className="data-mono mr-1.5 text-[0.7rem] uppercase tracking-wide text-blue-deep">
                        мы
                      </span>
                      {s.us}
                    </span>
                  </div>
                </div>

                <p className="mt-5 border-t border-line pt-4 text-[0.92rem] leading-relaxed text-ink-soft">
                  {s.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
