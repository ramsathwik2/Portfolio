import { useState, useRef, Suspense, Component, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Scene from './Scene'
import ProjectDetail from './ProjectDetail'

const projects = [
  {
    title: 'Raw DNG Camera App',
    slug: 'raw-dng-camera',
    category: 'iOS Development',
    description: 'Bypasses Apple\'s default image processing to capture log-format video at 24fps with real-time Metal GPU-accelerated gamma curves for professional color grading.',
    tech: ['Swift', 'Metal', 'Core Image', 'RAW'],
  },
  {
    title: 'AI YouTube Automation',
    slug: 'ai-youtube-automation',
    category: 'AI Pipeline',
    description: 'End-to-end video production system — research, script generation (Gemini/Ollama), Pillow-based scene rendering (500+ elements), TTS voiceover, and YouTube upload — all running locally.',
    tech: ['Python', 'Gemini', 'Pillow', 'FFmpeg', 'edge-tts', 'Whisper'],
  },
  {
    title: 'SkillSwap',
    slug: 'skillswap',
    category: 'Web Platform',
    description: 'Peer-to-peer skill exchange and verifiable portfolio platform — learn from peers, build evidence-linked projects, get rubric-based peer reviews, and earn trust scores viewable by employers.',
    tech: ['Vanilla JS', 'CSS3', 'Three.js', 'WebRTC', 'localStorage'],
  },
  {
    title: 'Browser RPG',
    slug: 'browser-rpg',
    category: 'Game Dev',
    description: 'A Pokémon-style narrative game that teaches video editing through its storyline.',
    tech: ['TypeScript', 'Canvas', 'Phaser', 'Vite'],
  },
]

const appearSpring = { type: 'spring' as const, bounce: 0.2, duration: 0.4 }

class CanvasErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    return this.state.hasError ? <div className="fixed inset-0 bg-deep" /> : this.props.children
  }
}

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 z-50 p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-warm"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ backgroundColor: '#0a0a0a' }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-warm"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center gap-6">
              {['Work', 'About', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="text-3xl font-medium text-warm hover:text-sky transition-colors"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function SaganQuoteSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.2 }}
        >
          <p className="text-xl sm:text-2xl lg:text-3xl text-warm leading-relaxed font-light italic"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            &ldquo;Look again at that dot. That&rsquo;s here. That&rsquo;s home. That&rsquo;s us. On it everyone you love, everyone you know, everyone you ever heard of, every human being who ever was, lived out their lives.&rdquo;
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1, delay: 0.4 }}
          className="lg:pl-12 lg:border-l border-white/10"
        >
          <p className="text-base lg:text-lg text-warm-muted mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            &mdash; Carl Sagan
          </p>
          <p className="text-sm lg:text-base text-warm-muted/60 italic" style={{ fontFamily: 'Inter, sans-serif' }}>
            <em>Pale Blue Dot</em>, 1994
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function BioSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1 }}
          className="lg:col-span-3 flex justify-center lg:justify-end"
        >
          <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-white/10">
            <img src={`${import.meta.env.BASE_URL}profile.png`} alt="Ram Sathwik" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <p className="text-xs text-warm-muted tracking-widest uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>About Me</p>
          <p className="text-4xl sm:text-5xl lg:text-7xl text-warm font-light mb-8"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            I'm Ram Sathwik
          </p>
          <div className="space-y-5 text-warm-muted text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            <p>
              I refuse to settle for an ordinary life. I'm driven by a relentless desire
              to build something meaningful — not just a career, but a life that leaves behind
              ideas, creations, and impact. I never follow a predefined path; I question,
              analyze, imagine, and build.
            </p>
            <p>
              My interests span AI, iOS engineering, filmmaking, design, psychology, philosophy,
              and entrepreneurship. I don't see them as unrelated — each one sharpens how I
              see the others. I've built an AI multi-agent automation ecosystem, a raw DNG
              camera pipeline in Swift, a skills-for-credits platform, and narrative RPGs.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="work" className="relative z-10 px-6 py-32 min-h-screen flex items-center">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-2 lg:sticky lg:top-1/3 lg:self-start"
        >
          <p className="text-xs text-warm-muted tracking-widest uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Work</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-warm font-light mb-6"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            What I've Built
          </h2>
          <p className="text-warm-muted text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Four projects. Four domains. One thread: curiosity.
          </p>
        </motion.div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ ...appearSpring, delay: i * 0.06 }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 hover:border-sky/20">
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-medium text-sky bg-sky/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-medium text-warm mb-3"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                    {project.title}
                  </h3>
                  <p className="text-base text-warm-muted leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 text-[11px] rounded-md bg-white/5 text-warm-muted border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link to={`/project/${project.slug}`} className="inline-flex items-center gap-1.5 text-xs font-medium text-warm-muted hover:text-sky transition-colors">
                    View Project <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  const values = [
    'Curiosity over certainty',
    'Purpose over prestige',
    'Creation over consumption',
    'Excellence over mediocrity',
    'Meaning over success',
  ]

  return (
    <section className="relative z-10 flex items-center justify-center px-6 py-32 min-h-screen">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
        <motion.div className="lg:col-span-3 space-y-20">
          {values.map((v, i) => (
            <motion.p
              key={v}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30%' }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="text-3xl sm:text-4xl lg:text-6xl text-warm font-light"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              {v}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 lg:pl-12 lg:border-l border-white/10 space-y-6"
        >
          <p className="text-base lg:text-lg text-warm-muted leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            From that pale blue dot, with purpose.
          </p>
          <a
            href="mailto:your.email@example.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky/10 text-sky text-sm font-medium hover:bg-sky/20 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Get in touch
          </a>
          <p className="text-xs text-warm-muted/40 pt-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            &copy; {new Date().getFullYear()} RamSa.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function ScrollManager({ onScroll }: { onScroll: (v: number) => void }) {
  const { scrollYProgress } = useScroll()
  useMotionValueEvent(scrollYProgress, "change", (latest) => { onScroll(latest) })
  return null
}

class FatalBoundary extends Component<{ children: ReactNode }> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(e: Error) { return { error: e } }
  render() {
    if (this.state.error) {
      return <div className="min-h-screen bg-deep flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-xs text-warm-muted mb-4">Something went wrong</p>
          <p className="text-warm text-sm max-w-md" style={{ fontFamily: 'Inter, sans-serif' }}>
            {this.state.error.message}
          </p>
        </div>
      </div>
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <FatalBoundary>
      <RouterApp />
    </FatalBoundary>
  )
}

function RouterApp() {
  const scrollRef = useRef(0)

  return (
    <BrowserRouter basename="/Portfolio">
      <Routes>
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        <Route path="/" element={<MainPage scrollRef={scrollRef} />} />
      </Routes>
    </BrowserRouter>
  )
}

function MainPage({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <div className="relative bg-deep min-h-screen">
      <ScrollManager onScroll={(v) => { scrollRef.current = v }} />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <CanvasErrorBoundary>
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
              <Scene scrollRef={scrollRef} />
            </Canvas>
          </Suspense>
        </CanvasErrorBoundary>
      </div>

      <Navbar />

      <div className="relative z-10">
        <BioSection />
        <SaganQuoteSection />
        <ProjectsSection />
        <ValuesSection />
      </div>
    </div>
  )
}
