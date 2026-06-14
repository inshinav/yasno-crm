import { Activity, LifeBuoy, PenLine, Route, Sparkles, Users, UserCheck, type LucideIcon } from 'lucide-react'
import { aiCapabilities, type AiCapability } from '../data/ai'
import { SectionHeader } from './SectionHeader'
import { Stagger, StaggerItem } from './Reveal'

const icons: Record<AiCapability['icon'], LucideIcon> = {
  sparkles: Sparkles,
  activity: Activity,
  support: LifeBuoy,
  route: Route,
  users: Users,
  pen: PenLine,
}

export function AILayer() {
  return (
    <section id="ai" className="scroll-mt-8 py-20 sm:py-28">
      <div className="shell">
        <SectionHeader
          index="05"
          kicker="AI-слой"
          title="AI ведёт по пути, а не догоняет по воронке"
          intro="Слой поверх стратегии: персонализация под состояние, ранние сигналы оттока и уместный следующий шаг. На остром — не маркетинг, а поддержка; на всём чувствительном — человек в контуре."
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {aiCapabilities.map((c) => {
            const Icon = icons[c.icon]
            return (
              <StaggerItem key={c.title}>
                <article
                  className="card flex h-full flex-col p-6"
                  style={c.hitl ? { borderLeft: '3px solid var(--care)' } : undefined}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      c.hitl ? 'bg-care/15 text-care-deep' : 'bg-blue/10 text-blue-deep'
                    }`}
                  >
                    <Icon size={19} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[1.05rem] font-semibold leading-snug text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.94rem] leading-relaxed text-ink-soft">{c.body}</p>
                  {c.hitl && (
                    <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-care/12 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wide text-care-deep">
                      <UserCheck size={13} aria-hidden />
                      human-in-the-loop
                    </span>
                  )}
                </article>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
