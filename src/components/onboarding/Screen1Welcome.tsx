import React from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'

interface Props {
  onNext: () => void
}

export const Screen1Welcome: React.FC<Props> = ({ onNext }) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-between h-full text-center px-8 py-12">
      {/* בורר שפה */}
      <div className="self-end">
        <LanguageSwitcher />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <svg viewBox="0 0 100 100" width="96" height="96">
          <defs>
            <linearGradient id="mg-w" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C47B5A" />
              <stop offset="50%" stopColor="#9B6BAE" />
              <stop offset="100%" stopColor="#4A90C4" />
            </linearGradient>
          </defs>
          <path
            d="M18 78 L18 34 C18 22,26 16,36 16 C44 16,49 22,50 32 C51 22,56 16,64 16 C74 16,82 22,82 34 L82 78"
            stroke="url(#mg-w)" strokeWidth="8" strokeLinecap="round" fill="none"
          />
          <circle cx="50" cy="58" r="5.5" fill="url(#mg-w)" />
        </svg>

        <div className="space-y-3">
          <h1
            className="text-4xl text-gray-900 leading-tight"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            {t('onboarding.screen1.title')}
            <br />
            <span className="text-[#7C3AED]">{t('onboarding.screen1.titleHighlight')}</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            {t('onboarding.screen1.subtitle')}
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-2xl bg-[#7C3AED] text-white text-base font-semibold
          shadow-lg shadow-purple-500/30 hover:bg-[#6D28D9] active:scale-[0.98]
          transition-all duration-200"
      >
        {t('onboarding.screen1.cta')}
      </button>
    </div>
  )
}
