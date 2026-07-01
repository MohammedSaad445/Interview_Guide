import { useState, useEffect, useRef, useCallback } from 'react'

const MODES = {
  work:  { label: 'Focus',       minutes: 25, color: '#1A73E8', ring: '#428EF5' },
  short: { label: 'Short Break', minutes: 5,  color: '#00897B', ring: '#4DB6AC' },
  long:  { label: 'Long Break',  minutes: 15, color: '#7B2FBE', ring: '#A855F7' },
}

const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function pad(n) { return String(n).padStart(2, '0') }

function playBeep() {
  try {
    const AudioCtx = globalThis.AudioContext || globalThis.webkitAudioContext
    if (!AudioCtx) return
    const ctx  = new AudioCtx()
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 660
    gain.gain.setValueAtTime(0.4, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)
    osc.start()
    osc.stop(ctx.currentTime + 1.2)
  } catch (err) {
    console.warn('Audio not available', err)
  }
}

export default function PomodoroTimer() {
  const [mode, setMode]           = useState('work')
  const [secondsLeft, setSeconds] = useState(MODES.work.minutes * 60)
  const [running, setRunning]     = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const [sessions, setSessions]   = useState(0)
  const [finished, setFinished]   = useState(false)

  const intervalRef = useRef(null)

  const totalSeconds = MODES[mode].minutes * 60
  const progress     = secondsLeft / totalSeconds
  const dashOffset   = CIRCUMFERENCE * (1 - progress)

  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60

  const reset = useCallback((m = mode) => {
    clearInterval(intervalRef.current)
    setRunning(false)
    setSeconds(MODES[m].minutes * 60)
    setFinished(false)
  }, [mode])

  const switchMode = (m) => {
    setMode(m)
    reset(m)
  }

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            setFinished(true)
            setSessions(s => s + 1)
            playBeep()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, mode])

  const modeConfig = MODES[mode]

  return (
    <div
      className="fixed bottom-6 right-6 z-50 select-none"
      style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.28))' }}
    >
      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-white font-semibold text-sm
                     backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #1E3A5F 60%, #1A73E8)' }}
          title="Open Pomodoro Timer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="13" r="8" />
            <path strokeLinecap="round" d="M12 9v4l2.5 2.5" />
            <path strokeLinecap="round" d="M9 2h6M12 2v2" />
          </svg>
          <span>
            {running ? `${pad(mins)}:${pad(secs)}` : 'Pomodoro'}
          </span>
          {running && (
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          )}
          {sessions > 0 && (
            <span className="bg-white/20 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
              {sessions}🍅
            </span>
          )}
        </button>
      ) : (
        <div
          className="w-72 rounded-3xl overflow-hidden border border-white/15 backdrop-blur-xl"
          style={{ background: 'linear-gradient(160deg, #0E1328 0%, #1E3A5F 100%)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="13" r="8" />
                <path strokeLinecap="round" d="M12 9v4l2.5 2.5" />
                <path strokeLinecap="round" d="M9 2h6M12 2v2" />
              </svg>
              <span className="text-white font-bold text-sm tracking-wide">Pomodoro Timer</span>
            </div>
            <button
              onClick={() => setCollapsed(true)}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Mode tabs */}
          <div className="flex gap-1 px-4 pb-3">
            {Object.entries(MODES).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => switchMode(key)}
                className={`flex-1 text-xs font-semibold py-1.5 rounded-xl transition-all duration-150
                  ${mode === key
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                style={mode === key ? { background: cfg.color + '33', color: cfg.ring } : {}}
              >
                {cfg.label}
              </button>
            ))}
          </div>

          {/* Ring + time display */}
          <div className="flex flex-col items-center px-6 pb-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60" cy="60" r={RADIUS}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="8"
                />
                <circle
                  cx="60" cy="60" r={RADIUS}
                  fill="none"
                  stroke={modeConfig.ring}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                  style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.4s' }}
                />
              </svg>

              <div className="relative text-center z-10">
                <div
                  className="text-4xl font-extrabold tabular-nums leading-none"
                  style={{ color: finished ? '#F9AB00' : 'white' }}
                >
                  {pad(mins)}:{pad(secs)}
                </div>
                <div className="text-xs mt-1 font-medium" style={{ color: modeConfig.ring }}>
                  {finished ? '✓ Done!' : modeConfig.label}
                </div>
              </div>
            </div>

            {/* Session dots */}
            <div className="flex gap-1.5 mt-3 mb-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`dot-${i}`}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    background: i < (sessions % 4)
                      ? modeConfig.color
                      : 'rgba(255,255,255,0.12)'
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mb-4">
              {sessions} session{sessions === 1 ? '' : 's'} completed
            </p>

            {/* Controls */}
            <div className="flex items-center gap-3 w-full justify-center">
              <button
                onClick={() => reset(mode)}
                className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                title="Reset"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              <button
                onClick={() => { setRunning(r => !r); setFinished(false) }}
                className="flex items-center justify-center w-14 h-14 rounded-2xl font-bold text-white
                           transition-all duration-150 hover:scale-105 active:scale-95 shadow-lg"
                style={{ background: `linear-gradient(135deg, ${modeConfig.color}, ${modeConfig.ring})` }}
                title={running ? 'Pause' : 'Start'}
              >
                {running ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => {
                  const keys = Object.keys(MODES)
                  const next = keys[(keys.indexOf(mode) + 1) % keys.length]
                  switchMode(next)
                }}
                className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                title="Next mode"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="border-t border-white/5 px-5 py-3">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              💡 25 min focus → 5 min break → repeat
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

