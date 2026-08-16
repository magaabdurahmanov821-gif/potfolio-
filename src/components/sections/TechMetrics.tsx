import { motion } from 'framer-motion'
import { Gauge, ShieldCheck, Smartphone, Zap } from 'lucide-react'

const metrics = [
  { value: '100/100', label: 'Google Lighthouse', detail: 'Performance', icon: Gauge, badge: 'Verified' },
  { value: '< 0.8s', label: 'First Contentful Paint', detail: 'Fast first screen', icon: Zap, badge: 'FCP' },
  { value: '100%', label: 'Adaptive interface', detail: 'Mobile First & PWA Ready', icon: Smartphone, badge: 'Ready' },
  { value: '99.9%', label: 'Architecture uptime', detail: 'Reliable by design', icon: ShieldCheck, badge: 'Uptime' },
]

export function TechMetrics() {
  return (
    <section className="tech-metrics py-20 sm:py-28" aria-labelledby="metrics-title">
      <div className="page-line border-t pt-4">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div><p className="page-muted font-mono text-[10px] uppercase">Technical standard</p><h2 id="metrics-title" className="mt-3 text-3xl font-semibold tracking-[-.07em] sm:text-5xl">Built to feel instant.</h2></div>
          <p className="page-muted hidden max-w-44 text-right text-xs leading-relaxed sm:block">Measured performance, resilient delivery and carefully tuned interfaces.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return <motion.article key={metric.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: .45, delay: index * .06 }} whileHover={{ y: -5 }} className="metric-card rounded-xl border p-4 sm:p-5">
              <div className="flex items-start justify-between"><div className="metric-ring grid size-10 place-items-center rounded-full"><Icon size={16} /></div><span className="metric-badge inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[9px]"><i className="metric-dot relative size-1.5 rounded-full" />{metric.badge}</span></div>
              <p className="mt-9 text-3xl font-semibold tracking-[-.08em]">{metric.value}</p>
              <p className="mt-3 text-xs font-semibold tracking-[-.02em]">{metric.label}</p>
              <p className="page-muted mt-1 text-[11px]">{metric.detail}</p>
            </motion.article>
          })}
        </div>
      </div>
    </section>
  )
}
