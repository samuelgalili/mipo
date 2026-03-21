import React, { useEffect, useState } from 'react'

export const ComingSoonPage: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 p-6"
    >
      {/* עיגולי רקע דקורטיביים */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-fuchsia-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-100/40 rounded-full blur-2xl" />
      </div>

      {/* תוכן */}
      <div
        className={[
          'relative flex flex-col items-center gap-8 transition-all duration-1000 ease-out',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        ].join(' ')}
      >
        {/* לוגו */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-7xl drop-shadow-sm">🐾</span>
          <span className="text-5xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            MIPO
          </span>
        </div>

        {/* קו מפריד */}
        <div className="w-16 h-0.5 rounded-full bg-gradient-to-r from-purple-300 via-violet-300 to-fuchsia-300" />

        {/* טקסט */}
        <p className="text-2xl sm:text-3xl font-semibold text-gray-700 tracking-wide">
          בקרוב 🐾
        </p>
      </div>
    </div>
  )
}
