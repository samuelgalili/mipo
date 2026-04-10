import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { OnboardingData } from '../../types/onboarding'
import { PET_OPTIONS } from '../../types/onboarding'

interface Props {
  data: OnboardingData
  onFinish: () => void
}

export const Screen6Done: React.FC<Props> = ({ data, onFinish }) => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const pet = PET_OPTIONS.find((p) => p.type === data.petType)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={[
        'flex flex-col items-center justify-between h-full px-8 py-12 text-center',
        'transition-all duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      ].join(' ')}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* תמונת החיה */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20 ring-offset-4 shadow-elevated">
            <img src={pet?.photo} alt={pet?.label} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -left-1 w-9 h-9 bg-success rounded-full flex items-center justify-center text-white text-base shadow-button border-2 border-white">
            ✓
          </div>
        </div>

        {/* טקסט */}
        <div className="space-y-3">
          <h2
            className="text-3xl text-foreground leading-snug"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            {t('onboarding.screen6.readyTitle', { petName: data.petName, ownerName: data.ownerName })}
          </h2>
          <p className="text-muted-foreground text-sm">{t('onboarding.screen6.welcome')}</p>
        </div>

        {/* סיכום */}
        <div className="w-full bg-secondary rounded-organic p-4 text-sm text-right space-y-2 border border-border">
          <div className="flex justify-between text-muted-foreground">
            <span className="font-semibold text-foreground">{data.petName}</span>
            <span>{pet?.emoji} {String(t(`pets.${data.petType}.label` as any, pet?.label ?? ''))}</span>
          </div>
          {data.petBreed && (
            <div className="flex justify-between text-muted-foreground">
              <span>{data.petBreed}</span>
              <span>{t('onboarding.screen6.breedLabel')}</span>
            </div>
          )}
          {data.petAge && (
            <div className="flex justify-between text-muted-foreground">
              <span>{data.petAge} {t('onboarding.screen6.years')}</span>
              <span>{t('onboarding.screen6.ageLabel')}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onFinish}
        className="w-full py-4 rounded-xl bg-gradient-primary text-white text-base font-semibold
          shadow-button hover:shadow-button-hover hover:opacity-95 active:scale-[0.98]
          transition-all duration-200 mt-8"
      >
        {t('onboarding.screen6.dashboardBtn')}
      </button>
    </div>
  )
}
