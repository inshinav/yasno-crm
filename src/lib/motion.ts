import type { Variants } from 'framer-motion'

// Мягкий «бумажный» easing — тот же, что в токенах (cubic-bezier).
export const soft: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Один сильный fade + small-y. Без параллакса-ради-параллакса.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: soft } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: soft } },
}

// Контейнер для stagger дочерних элементов.
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

// whileInView — один раз, чуть раньше центра экрана.
export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' } as const
