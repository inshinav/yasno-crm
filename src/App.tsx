import { useState } from 'react'
import { ScrollProgress } from './components/ScrollProgress'
import { Hero } from './components/Hero'
import { Manifesto } from './components/Manifesto'
import { JourneyMapSection } from './components/JourneyMapSection'
import { Segmentation } from './components/Segmentation'
import { ToneEngine } from './components/ToneEngine'
import { AILayer } from './components/AILayer'
import { Metrics } from './components/Metrics'
import { MindboxLayer } from './components/MindboxLayer'
import { Roadmap } from './components/Roadmap'
import { QuietClose } from './components/QuietClose'

export default function App() {
  // Выбранная стадия пути живёт здесь: клик по узлу в герое открывает её в ядре.
  const [focusStage, setFocusStage] = useState<number | null>(5)

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <ScrollProgress />
      <Hero onPickStage={setFocusStage} />
      <main>
        <Manifesto />
        <JourneyMapSection pinned={focusStage} setPinned={setFocusStage} />
        <Segmentation />
        <ToneEngine />
        <AILayer />
        <Metrics />
        <MindboxLayer />
        <Roadmap />
      </main>
      <QuietClose />
    </div>
  )
}
