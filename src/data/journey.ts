// Карта терапевтического пути — ядро сайта.
// 11 стадий = эмоциональные стадии клиента в терапии, не этапы воронки.
// Контент дословно из брифа стратегии.

export type TintKey =
  | 'guarded'
  | 'curious'
  | 'uncertain'
  | 'warm'
  | 'critical'
  | 'alliance'
  | 'fatigue'
  | 'searching'
  | 'closure'
  | 'return'
  | 'advocate'

// Тинт узла = эмоциональное состояние. Мягкие тональные сдвиги, не кричащие.
export const stateTints: Record<TintKey, string> = {
  guarded: 'var(--state-guarded)',
  curious: 'var(--state-curious)',
  uncertain: 'var(--state-uncertain)',
  warm: 'var(--state-warm)',
  critical: 'var(--state-critical)',
  alliance: 'var(--state-alliance)',
  fatigue: 'var(--state-fatigue)',
  searching: 'var(--state-searching)',
  closure: 'var(--state-closure)',
  return: 'var(--state-return)',
  advocate: 'var(--state-advocate)',
}

export type Stage = {
  n: number
  key: string
  label: string
  /** короткое имя состояния для узла/чипа */
  mood: string
  state: string
  risk?: string
  goal: string
  channel: string
  tone?: string
  metric: string
  tint: TintKey
  critical?: boolean
}

export const stages: Stage[] = [
  {
    n: 1,
    key: 'doubt',
    label: 'Сомнение',
    mood: 'стигма, недоверие',
    state: 'стигма, страх, «само пройдёт», недоверие',
    risk: 'уйдёт к альтернативам — таролог, друзья, ничего',
    goal: 'снять барьер, дать ценность до покупки',
    channel: 'контент, тесты самодиагностики',
    tone: 'нормализующий, без давления',
    metric: 'вовлечение → диагностика',
    tint: 'guarded',
  },
  {
    n: 2,
    key: 'diagnostics',
    label: 'Диагностика',
    mood: 'любопытство + тревога',
    state: '«а что со мной», любопытство и тревога — прошёл тест, но не записался',
    risk: '«прочитал и забыл»',
    goal: 'персональный разбор → мягкий мост к подбору',
    channel: 'email / мессенджер',
    tone: 'бережный, конкретный',
    metric: 'диагностика → заявка на подбор',
    tint: 'curious',
  },
  {
    n: 3,
    key: 'matching',
    label: 'Подбор',
    mood: 'страх «не моего»',
    state: '«кто меня будет лечить», страх «не моего» специалиста',
    risk: 'паралич выбора',
    goal: 'уверенность в выборе',
    channel: 'видеопрофили, объяснение подходов, поддержка',
    metric: 'подбор → оплата установочной',
    tint: 'uncertain',
  },
  {
    n: 4,
    key: 'intro-session',
    label: 'Установочная',
    mood: 'волнение',
    state: 'волнение, проверка «мой ли человек»',
    goal: 'настроить ожидания — первая сессия про знакомство, не про результат',
    channel: 'подготовительное письмо / пуш',
    tone: 'тёплый, снимающий тревогу',
    metric: 'явка на первую',
    tint: 'warm',
  },
  {
    n: 5,
    key: 'transition-1-2',
    label: 'Переход 1→2',
    mood: 'хрупкое сомнение',
    state: 'сомнение «подошёл ли / работает ли», дискомфорт нормален',
    risk: 'тихий отвал после первой — самый критичный момент',
    goal: 'довести до 2-й либо мягкий re-match',
    channel: 'бережный чек-ин',
    tone: 'нормализующий',
    metric: 'конверсия 1→2 — ключевая активация',
    tint: 'critical',
    critical: true,
  },
  {
    n: 6,
    key: 'alliance',
    label: 'Рабочий альянс',
    mood: 'вовлечён, прогресс',
    state: 'вовлечён, есть прогресс',
    goal: 'удержать ритм и LT',
    channel: 'поддержка ритма, циклические пакеты, вехи прогресса',
    tone: 'партнёрский',
    metric: 'retention, сессий за период, LT',
    tint: 'alliance',
  },
  {
    n: 7,
    key: 'plateau',
    label: 'Плато',
    mood: 'усталость, мысли бросить',
    state: '«топчемся на месте», усталость, мысли бросить',
    risk: 'churn',
    goal: 'пере-контракт на цель / re-match / пауза вместо ухода',
    channel: 'чек-ин про цели терапии',
    tone: 'честный, поддерживающий',
    metric: 're-match / пере-контракт vs churn',
    tint: 'fatigue',
  },
  {
    n: 8,
    key: 'rematch',
    label: 'Re-match',
    mood: '«не мой терапевт»',
    state: '«не мой терапевт», но из терапии уходить не хочет',
    goal: 'смена специалиста внутри сервиса — не потеря человека из терапии',
    channel: 'безболезненный re-match flow',
    tone: '«нормально искать своего»',
    metric: 're-match retention',
    tint: 'searching',
  },
  {
    n: 9,
    key: 'closure',
    label: 'Завершение / пауза',
    mood: 'достиг цели',
    state: 'достиг цели / жизнь изменилась / финансы',
    goal: 'красивое завершение, дверь открыта',
    channel: 'подведение итогов + чек-ин через несколько недель',
    tone: 'уважительный, без удержания силой',
    metric: 'осознанное завершение vs тихий отвал',
    tint: 'closure',
  },
  {
    n: 10,
    key: 'return',
    label: 'Возвращение',
    mood: 'новый запрос',
    state: 'новый запрос / новый жизненный этап — терапия это пролонг',
    goal: 'лёгкий re-entry, желательно к тому же терапевту',
    channel: '«твой терапевт на связи»',
    tone: 'тёплый, без вины за паузу',
    metric: 'reactivation rate',
    tint: 'return',
  },
  {
    n: 11,
    key: 'advocate',
    label: 'Адвокат',
    mood: 'благодарность',
    state: 'благодарность, хочет делиться',
    goal: 'referral без удешевления — «подари сессию» — и амбассадорство: клиенты и психологи',
    channel: 'бережный referral, истории',
    tone: 'искренний',
    metric: 'referral, UGC',
    tint: 'advocate',
  },
]

// Порядок полей каскада — фиксированный, читается как цепочка причинности.
export const cascadeOrder: { key: keyof Stage; label: string }[] = [
  { key: 'state', label: 'состояние' },
  { key: 'risk', label: 'риск' },
  { key: 'goal', label: 'цель' },
  { key: 'channel', label: 'канал' },
  { key: 'tone', label: 'тон' },
  { key: 'metric', label: 'метрика' },
]
