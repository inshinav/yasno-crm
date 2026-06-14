import { ChevronDown, Layers, Database } from 'lucide-react'
import { engineBlocks, strategyBlocks, mindboxThesis, type MindboxBlock } from '../data/mindbox'
import { SectionHeader } from './SectionHeader'
import { Reveal } from './Reveal'

function Block({ b, tone }: { b: MindboxBlock; tone: 'strategy' | 'engine' }) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 ${
        tone === 'strategy' ? 'border-blue/25 bg-blue/[0.06]' : 'border-line bg-paper/70'
      }`}
    >
      <p className="text-[0.92rem] font-medium text-ink">{b.label}</p>
      {b.hint && <p className="data-mono mt-1 text-[0.68rem] text-ink-soft">{b.hint}</p>}
    </div>
  )
}

export function MindboxLayer() {
  return (
    <section id="mindbox" className="scroll-mt-8 py-20 sm:py-28">
      <div className="shell">
        <SectionHeader
          index="07"
          kicker="Архитектура"
          title="Всё это живёт поверх Mindbox"
          intro="Сегменты, триггеры, омниканальность, A/B и рекомендации подбора уже работают на Mindbox. Стратегия пути, тон и AI — слой над ним."
        />

        <Reveal className="mt-12">
          <div className="mx-auto max-w-3xl">
            {/* Слой поверх */}
            <div className="rounded-card border border-blue/25 bg-surface/40 p-5 shadow-lift sm:p-7">
              <div className="mb-4 flex items-center gap-2">
                <Layers size={16} className="text-blue-deep" aria-hidden />
                <span className="data-mono text-[0.72rem] uppercase tracking-wider text-blue-deep">
                  слой поверх — стратегия · тон · AI
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {strategyBlocks.map((b) => (
                  <Block key={b.label} b={b} tone="strategy" />
                ))}
              </div>
            </div>

            {/* Связь «поверх» */}
            <div className="flex items-center justify-center gap-2 py-3 text-ink-soft">
              <ChevronDown size={18} aria-hidden />
              <span className="data-mono text-[0.7rem] uppercase tracking-wider">поверх</span>
              <ChevronDown size={18} aria-hidden />
            </div>

            {/* База Mindbox */}
            <div className="rounded-card border border-line bg-surface/70 p-5 sm:p-7 paper-grain">
              <div className="mb-4 flex items-center gap-2">
                <Database size={16} className="text-ink-soft" aria-hidden />
                <span className="data-mono text-[0.72rem] uppercase tracking-wider text-ink-soft">
                  Mindbox · CRM / CDP-движок
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {engineBlocks.map((b) => (
                  <Block key={b.label} b={b} tone="engine" />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8" delay={0.05}>
          <p className="mx-auto max-w-2xl text-center text-[1.05rem] font-medium leading-relaxed text-ink">
            {mindboxThesis}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
