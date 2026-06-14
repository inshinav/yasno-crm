import { Reveal } from './Reveal'

type Props = {
  index: string
  kicker: string
  title: string
  intro?: string
  className?: string
}

// Единый заголовок секции: mono-eyebrow «03 · ПУТЬ КЛИЕНТА» + H2 + интро.
export function SectionHeader({ index, kicker, title, intro, className }: Props) {
  return (
    <Reveal className={className}>
      <p className="eyebrow">
        <span className="text-blue-deep">{index}</span>
        <span className="mx-2 opacity-40">·</span>
        {kicker}
      </p>
      <h2 className="mt-5 max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold text-ink">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">{intro}</p>
      )}
    </Reveal>
  )
}
