import { useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { Reveal } from './Reveal'

export function QuietClose() {
  const reduce = useReducedMotion()
  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })

  return (
    <footer className="py-24 sm:py-36">
      <div className="shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          {/* мягкий узел-исход */}
          <span
            className="mx-auto mb-8 block h-3 w-3 rounded-full"
            style={{ background: 'var(--care)' }}
            aria-hidden
          />
          <p className="text-[clamp(1.5rem,3.6vw,2.3rem)] font-semibold leading-snug text-ink">
            Мы не продаём сессии — мы сопровождаем путь.
            <br />
            <span className="text-ink-soft">Остальное считается само.</span>
          </p>
        </Reveal>

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="hairline" />
          <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="data-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft">
              внутренний документ · команда роста Ясно
            </p>
            <button
              type="button"
              onClick={toTop}
              className="group inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-blue-deep"
            >
              <ArrowUp size={15} className="transition-transform group-hover:-translate-y-0.5" aria-hidden />
              <span className="border-b border-blue-deep/30 pb-0.5 transition-colors group-hover:border-blue-deep">
                наверх
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
