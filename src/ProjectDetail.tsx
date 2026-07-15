import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Code2 } from 'lucide-react'

const projectData: Record<string, {
  title: string
  tagline: string
  description: string
  longDescription: string[]
  features: { title: string; desc: string }[]
  tech: string[]
  planetColor: string
  planetSize: string
  orbitColor: string
  githubUrl?: string
  demoUrl?: string
}> = {
  'raw-dng-camera': {
    title: 'Raw DNG Camera App',
    tagline: 'Professional log video from your iPhone',
    description: 'Bypasses Apple\'s default image processing to capture log-format video at 24fps with real-time Metal GPU-accelerated gamma curves for professional color grading.',
    longDescription: [
      'OpenLog is a professional filmmaking tool that captures video frames through the iPhone camera, applies real-time GPU-accelerated gamma curves via Metal Core Image kernels, and encodes the result as log-format video for professional color grading workflows.',
      'It features six gamma curve emulations — S-Log3, Apple Log, LogC3, V-Log, HLG, and Rec.709 — each implemented as custom CIColorKernel GPU shaders running on the Metal GPU. The app bypasses Apple\'s default image processing pipeline entirely, giving filmmakers direct access to raw sensor data.',
      'Additional pro tools include manual shutter angle control, ISO adjustment, white balance in Kelvin, LUT-based preview grading, zebras, false color, focus peaking, horizon level, and frame guides for cinematic aspect ratios.',
    ],
    features: [
      { title: 'Log Video Pipeline', desc: 'Direct sensor access via AVFoundation, bypassing Apple\'s default processing. 10-bit source support.' },
      { title: '6 Gamma Curves', desc: 'S-Log3, Apple Log, LogC3, V-Log, HLG, Rec.709 — GPU-accelerated CIColorKernel shaders.' },
      { title: 'Manual Exposure', desc: 'Shutter angle (45°–360°), ISO (50–1600), WB (3200K–10000K), exposure bias.' },
      { title: 'LUT Preview', desc: 'Load .cube LUT files for real-time on-device color grading preview.' },
      { title: 'Pro Monitoring', desc: 'Zebras, false color, focus peaking, horizon level, frame guides.' },
      { title: 'Multiple Codecs', desc: 'HEVC 4:2:0, 4:2:4, 4:4:4, 10-bit, and ProRes recording.' },
    ],
    tech: ['Swift', 'Metal', 'Core Image', 'AVFoundation', 'VideoToolbox', 'SwiftUI'],
    planetColor: '#4A90D9',
    planetSize: 'w-48 h-48 sm:w-56 sm:h-56',
    orbitColor: '#64C5FA',
    githubUrl: 'https://github.com/ramsathwik2/67cAM',
  },
}

const springUp = { type: 'spring' as const, bounce: 0.2, duration: 0.6 }

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()
  const project = projectData[projectId || '']

  if (!project) {
    return (
      <div className="min-h-screen bg-deep flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-4xl text-warm font-light mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Not Found</p>
          <Link to="/" className="text-sky text-sm hover:underline">Back home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep">
      <Link to="/" className="fixed top-6 left-6 z-50 p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-warm">
        <ArrowLeft className="w-5 h-5" />
      </Link>

      {/* Hero — Planet */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative mb-12"
        >
          {/* Orbit ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-white/10"
            style={{ width: '200%', height: '200%', left: '-50%', top: '-50%', borderColor: project.orbitColor + '20' }}
          />
          {/* Planet */}
          <div className={`${project.planetSize} rounded-full relative z-10 flex items-center justify-center`}
            style={{
              background: `radial-gradient(circle at 35% 35%, ${project.planetColor}88, ${project.planetColor}44, ${project.planetColor}22)`,
              boxShadow: `0 0 60px ${project.planetColor}44, 0 0 120px ${project.planetColor}22`,
            }}
          >
            <div className="text-center px-4">
              <p className="text-xs tracking-widest text-warm-muted uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>Planet</p>
              <p className="text-lg sm:text-xl font-medium text-warm mt-1" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>OpenLog</p>
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-3xl sm:text-4xl lg:text-6xl text-warm font-light text-center max-w-3xl"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          {project.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-warm-muted text-sm sm:text-base mt-4 text-center"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {project.tagline}
        </motion.p>
      </section>

      {/* About */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            className="text-xs text-warm-muted tracking-widest uppercase mb-2"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            About This Planet
          </motion.p>
          <div className="space-y-5 text-warm-muted text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            {project.longDescription.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ delay: i * 0.1 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Features — Moons */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-warm-muted tracking-widest uppercase mb-8 text-center"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Moons (Features)
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...springUp, delay: i * 0.06 }}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-sky/20 transition-all duration-500"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center mb-4 text-xs font-bold"
                  style={{ backgroundColor: project.orbitColor + '20', color: project.orbitColor }}>
                  {i + 1}
                </div>
                <h3 className="text-lg font-medium text-warm mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>{f.title}</h3>
                <p className="text-sm text-warm-muted leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech — Orbit Rings */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-warm-muted tracking-widest uppercase mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Orbit Rings (Tech)
          </motion.p>
          <div className="flex flex-wrap justify-center gap-2">
            {project.tech.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-4 py-2 text-sm rounded-full border"
                style={{
                  borderColor: project.orbitColor + '30',
                  backgroundColor: project.orbitColor + '10',
                  color: project.orbitColor,
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Demo & Links */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-warm-muted tracking-widest uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Explore
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-warm text-sm font-medium hover:bg-white/10 transition-colors border border-white/10">
                <Code2 className="w-4 h-4" /> GitHub
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky/10 text-sky text-sm font-medium hover:bg-sky/20 transition-colors">
                <ExternalLink className="w-4 h-4" /> Demo Video
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Back */}
      <div className="pb-12 text-center">
        <Link to="/" className="text-sm text-warm-muted hover:text-sky transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
          &larr; Back to system
        </Link>
      </div>
    </div>
  )
}
