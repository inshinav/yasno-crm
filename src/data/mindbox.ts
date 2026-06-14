// Поверх Mindbox. Не заменяем — достраиваем над ним слой заботы и экспериментов.

export type MindboxBlock = { label: string; hint?: string }

// База — всё уже живёт на Mindbox (CRM/CDP-движок).
export const engineBlocks: MindboxBlock[] = [
  { label: 'CDP-сегменты' },
  { label: 'Триггерные сценарии' },
  { label: 'Омниканальность', hint: 'email · push · мессенджеры · in-app' },
  { label: 'A/B-тесты' },
  { label: 'Рекомендации подбора' },
]

// Слой поверх — стратегия, тон и AI.
export const strategyBlocks: MindboxBlock[] = [
  { label: 'Стратегия пути', hint: 'стадии и каскады вместо воронки' },
  { label: 'Tone Engine', hint: 'редполитика заботы' },
  { label: 'AI-слой', hint: 'предиктив · next-best-action' },
]

export const mindboxThesis =
  'Не заменяем Mindbox — достраиваем над ним слой заботы и экспериментов.'
