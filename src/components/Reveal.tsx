import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  variants?: Variants
  /** небольшая индивидуальная задержка */
  delay?: number
}

// Одиночный scroll-reveal. prefers-reduced-motion → статичный финальный кадр.
export function Reveal({ children, className, variants = fadeUp, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

type StaggerProps = {
  children: ReactNode
  className?: string
  gap?: number
  delay?: number
}

// Контейнер: дети с StaggerItem проявляются каскадом.
export function Stagger({ children, className, gap = 0.08, delay = 0 }: StaggerProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}
