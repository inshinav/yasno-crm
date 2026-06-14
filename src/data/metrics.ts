// Метрики next level — outcome-based KPI-дерево + явный блок anti-metrics.
// Контент дословно из брифа.

export type Metric = {
  label: string
  primary?: boolean
}

export type MetricGroup = {
  key: string
  label: string
  items: Metric[]
  /** хвост-ремарка, напр. «как следствие, не цель» */
  tail?: string
  /** позитивный исход — care-зелёный акцент */
  care?: boolean
}

export const metricGroups: MetricGroup[] = [
  {
    key: 'activation',
    label: 'Активация',
    items: [{ label: 'конверсия 1→2 сессия', primary: true }, { label: 'явка на установочную' }],
  },
  {
    key: 'alliance',
    label: 'Альянс / удержание',
    items: [{ label: 'retention по неделям' }, { label: 'сессий за период' }, { label: 'LT в сессиях' }],
  },
  {
    key: 'outcome',
    label: 'Качество исхода',
    care: true,
    items: [
      { label: 'доля re-match вместо churn' },
      { label: 'осознанное завершение vs тихий отвал' },
      { label: 'NPS «чувствую поддержку»' },
    ],
  },
  {
    key: 'return',
    label: 'Возврат',
    items: [{ label: 'reactivation rate — пролонг' }],
  },
  {
    key: 'advocacy',
    label: 'Адвокатство',
    items: [{ label: 'referral' }, { label: 'UGC' }, { label: 'амбассадоры' }],
  },
  {
    key: 'revenue',
    label: 'Revenue',
    items: [{ label: 'аплифт выручки' }, { label: 'LTV' }],
    tail: 'как следствие, не цель',
  },
]

export const antiMetrics: string[] = [
  'open rate ради open rate',
  'разовые распродажи',
  'краткосрочную конверсию ценой доверия',
]
