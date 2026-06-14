import { motion, useScroll } from 'framer-motion'

// Тонкий ориентир прогресса чтения — не CTA, просто «где я в документе».
// Прямое отображение scrollYProgress (без пружины) — корректно и при reduced-motion.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-blue"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
