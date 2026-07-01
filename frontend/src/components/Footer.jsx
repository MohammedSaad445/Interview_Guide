import { Link } from 'react-router-dom'

const RESOURCES = [
  { label: 'Home',        to: '/' },
  { label: 'Search Q&As', to: '/search' },
]

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
                 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                 -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
                 .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
                 -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844
                 c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651
                 .64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855
                 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017
                 C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136
                 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37
                 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063
                 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542
                 C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0
                 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401
                 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.632 5.905-5.632zm-1.161
                 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

const TECH_STACK = [
  { label: 'React 18',       color: '#61DAFB' },
  { label: 'Vite',           color: '#646CFF' },
  { label: 'Tailwind CSS',   color: '#38BDF8' },
  { label: 'Java / Spring',  color: '#F89820' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-b from-[#0E1A2E] to-[#060D1A] text-gray-300 overflow-hidden">

      {/* Decorative top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.5fr] items-start gap-x-14 gap-y-10 pb-10 border-b border-white/8">

          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700
                              flex items-center justify-center text-white font-extrabold text-sm
                              shadow-lg shadow-blue-900/40 group-hover:scale-105 transition-transform">
                IG
              </div>
              <span className="text-white font-extrabold text-lg tracking-tight">
                Interview <span className="text-blue-400">Guide</span>
              </span>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
              A hands-on technical interview prep platform covering Java, DevOps, Cloud, and more —
              curated Q&amp;As, code examples, and diagrams to help you land your next role.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="p-2 rounded-xl bg-white/5 border border-white/8 text-gray-400
                             hover:text-white hover:bg-blue-600/30 hover:border-blue-500/40
                             transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:pt-1">
            <h3 className="text-white font-bold mb-5 text-xs uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {RESOURCES.map(r => (
                <li key={r.label}>
                  <Link
                    to={r.to}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white
                               transition-colors duration-150 group"
                  >
                    <svg className="w-3 h-3 text-gray-600 group-hover:text-blue-400 transition-colors shrink-0"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="md:pt-1">
            <h3 className="text-white font-bold mb-5 text-xs uppercase tracking-widest">
              About
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Open-source interview preparation tool. Content is scraped, structured, and
              exported using a custom Java backend, then served via a React frontend.
            </p>

            <h4 className="text-gray-300 font-semibold text-xs uppercase tracking-widest mb-3">
              Built with
            </h4>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map(t => (
                <span
                  key={t.label}
                  className="text-xs font-medium px-2.5 py-1 rounded-full border"
                  style={{
                    color: t.color,
                    borderColor: t.color + '44',
                    background: t.color + '11',
                  }}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs text-gray-500">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span>© {year} Interview Preparation Guide. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              All systems operational
            </span>
            <span className="text-gray-600">|</span>
            <span>
              Made with{' '}
              <span className="text-red-400">♥</span>
              {' '}for engineers
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0
                         00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              No data collected
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

