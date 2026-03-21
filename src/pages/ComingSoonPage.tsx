import React, { useEffect, useState } from 'react'

export const ComingSoonPage: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">

      {/* רקע aurora — blobs מטושטשים */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-200/40 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-fuchsia-200/40 blur-[100px]" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-violet-100/50 blur-[80px]" />
      </div>

      {/* תוכן */}
      <div
        className={[
          'relative flex flex-col items-center gap-10 transition-all duration-1000 ease-out',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ].join(' ')}
      >
        {/* לוגו MIPO */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-2xl opacity-25 scale-125 bg-[radial-gradient(ellipse_at_center,_#9B6BAE,_#4A90C4)]" />
          <svg viewBox="0 0 100 100" width="140" height="140" className="relative drop-shadow-xl">
            <defs>
              <linearGradient id="mg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#C47B5A" />
                <stop offset="50%" stopColor="#9B6BAE" />
                <stop offset="100%" stopColor="#4A90C4" />
              </linearGradient>
            </defs>
            <path
              d="M18 78 L18 34 C18 22,26 16,36 16 C44 16,49 22,50 32 C51 22,56 16,64 16 C74 16,82 22,82 34 L82 78"
              stroke="url(#mg)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="50" cy="58" r="5.5" fill="url(#mg)" />
          </svg>
        </div>

        {/* טקסט */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1
            className="text-5xl sm:text-6xl text-gray-900 leading-tight"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            MIPO בקרוב 🐾
          </h1>
          <div className="w-20 h-0.5 rounded-full bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 mt-1" />
        </div>
      </div>
    </div>
  )
}
