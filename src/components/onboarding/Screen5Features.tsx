import React from 'react'
import { useTranslation } from 'react-i18next'

export const Screen5Features: React.FC = () => {
  const { t } = useTranslation()
  const features = t('onboarding.screen5.features', { returnObjects: true }) as {
    icon: string; title: string; desc: string
  }[]

  return (
    <div className="flex flex-col gap-6 px-6 py-8">
      <div>
        <h2
          className="text-3xl text-foreground leading-snug whitespace-pre-line"
          style={{ fontFamily: '"DM Serif Display", serif' }}
        >
          {t('onboarding.screen5.title')}
        </h2>
        <p className="text-muted-foreground text-sm mt-2">{t('onboarding.screen5.subtitle')}</p>
      </div>

      <div className="flex flex-col gap-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex items-start gap-4 p-4 rounded-organic bg-secondary hover:bg-primary/5 transition-colors duration-200"
          >
            <span className="text-2xl shrink-0 mt-0.5">{f.icon}</span>
            <div>
              <p className="font-semibold text-foreground text-sm">{f.title}</p>
              <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
