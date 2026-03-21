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
        {/* עיגול לוגו M */}
        <div className="relative">
          {/* הילה חיצונית */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-violet-400 to-fuchsia-400 blur-2xl opacity-30 scale-110" />

          {/* עיגול ראשי */}
          <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-purple-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-purple-400/40">
            {/* עיגול פנימי */}
            <div className="absolute inset-[3px] rounded-full bg-white/10" />
            {/* האות M */}
            <span
              className="text-white text-6xl leading-none select-none"
              style={{ fontFamily: '"DM Serif Display", serif' }}
            >
              M
            </span>
          </div>
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
