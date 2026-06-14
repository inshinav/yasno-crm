import { Check, X } from 'lucide-react'
import { dos, donts } from '../data/tone'
import { SectionHeader } from './SectionHeader'
import { Reveal, Stagger, StaggerItem } from './Reveal'

export function ToneEngine() {
  return (
    <section id="tone" className="scroll-mt-8 border-t border-line bg-surface/40 py-20 sm:py-28">
      <div className="shell">
        <SectionHeader
          index="04"
          kicker="Tone Engine"
          title="Редполитика заботы. Этика встроена в архитектуру, а не дописана сверху."
          intro="Crisis-awareness и human-in-the-loop — не оговорки в подвале, а правила, по которым живёт каждая коммуникация."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {/* ДЕЛАЕМ */}
          <Reveal className="h-full">
            <div className="card h-full p-6 sm:p-8" style={{ borderLeft: '3px solid var(--care)' }}>
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-care/15 text-care-deep">
                  <Check size={16} aria-hidden />
                </span>
                <h3 className="text-lg font-semibold text-ink">Делаем</h3>
              </div>
              <Stagger className="mt-6 space-y-3.5" gap={0.06}>
                {dos.map((r) => (
                  <StaggerItem key={r.text}>
                    <div
                      className={`flex items-start gap-3 rounded-xl p-3 ${
                        r.emphasis ? 'bg-care/10 ring-1 ring-care/25' : ''
                      }`}
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-care-deep" aria-hidden />
                      <p className="text-[0.96rem] leading-relaxed text-ink">
                        {r.text}
                        {r.emphasis && (
                          <span className="data-mono ml-2 align-middle text-[0.62rem] uppercase tracking-wider text-care-deep">
                            · опора
                          </span>
                        )}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>

          {/* НИКОГДА */}
          <Reveal className="h-full" delay={0.08}>
            <div className="card h-full bg-surface/60 p-6 sm:p-8" style={{ borderLeft: '3px solid var(--clay)' }}>
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-clay/15 text-clay-deep">
                  <X size={16} aria-hidden />
                </span>
                <h3 className="text-lg font-semibold text-ink-soft">Никогда</h3>
              </div>
              <Stagger className="mt-6 space-y-3.5" gap={0.06}>
                {donts.map((r) => (
                  <StaggerItem key={r.text}>
                    <div className="flex items-start gap-3 p-3">
                      <X size={16} className="mt-0.5 shrink-0 text-clay-deep/70" aria-hidden />
                      <p className="text-[0.96rem] leading-relaxed text-ink-soft">{r.text}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
