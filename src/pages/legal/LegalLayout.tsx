import React, { useState } from 'react'

interface LegalLayoutProps {
  he: React.ReactNode
  en: React.ReactNode
  lastUpdated: string
}

export const LegalLayout: React.FC<LegalLayoutProps> = ({ he, en, lastUpdated }) => {
  const [lang, setLang] = useState<'he' | 'en'>('he')

  return (
    <div className="min-h-screen bg-white">

      {/* Aurora background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-200/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-fuchsia-200/30 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* לוגו + חזרה */}
          <a href="/" className="flex items-center gap-2.5 group">
            <svg viewBox="0 0 100 100" width="32" height="32">
              <defs>
                <linearGradient id="mlg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#C47B5A" />
                  <stop offset="50%" stopColor="#9B6BAE" />
                  <stop offset="100%" stopColor="#4A90C4" />
                </linearGradient>
              </defs>
              <path
                d="M18 78 L18 34 C18 22,26 16,36 16 C44 16,49 22,50 32 C51 22,56 16,64 16 C74 16,82 22,82 34 L82 78"
                stroke="url(#mlg)" strokeWidth="9" strokeLinecap="round" fill="none"
              />
              <circle cx="50" cy="58" r="5.5" fill="url(#mlg)" />
            </svg>
            <span className="text-sm text-gray-500 group-hover:text-purple-600 transition-colors">
              {lang === 'he' ? '← חזרה לאתר' : '← Back to site'}
            </span>
          </a>

          {/* בורר שפה */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setLang('he')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                lang === 'he'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              עברית
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                lang === 'en'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </header>

      {/* תוכן */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-12 pb-24">
        <div
          dir={lang === 'he' ? 'rtl' : 'ltr'}
          className="bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-xl shadow-purple-50/60 p-8 md:p-12 prose prose-gray max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h1:text-3xl prose-h1:mb-2
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-h2:text-purple-800
            prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-[15px]
            prose-li:text-gray-600 prose-li:text-[15px]
            prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-800"
        >
          {lang === 'he' ? he : en}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          {lang === 'he' ? `עודכן לאחרונה: ${lastUpdated}` : `Last updated: ${lastUpdated}`}
        </p>
      </main>
    </div>
  )
}
