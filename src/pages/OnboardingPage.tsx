import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import type { OnboardingData } from '../types/onboarding'
import { ProgressBar } from '../components/onboarding/ProgressBar'
import { Screen1Welcome } from '../components/onboarding/Screen1Welcome'
import { Screen2PetType } from '../components/onboarding/Screen2PetType'
import { Screen3PetDetails } from '../components/onboarding/Screen3PetDetails'
import { Screen4Owner } from '../components/onboarding/Screen4Owner'
import { Screen5Features } from '../components/onboarding/Screen5Features'
import { Screen6Done } from '../components/onboarding/Screen6Done'

const TOTAL = 6

const initialData: OnboardingData = {
  petType: '',
  petName: '',
  petAge: '',
  petBreed: '',
  ownerName: '',
  ownerEmail: '',
}

type Errors = Partial<Record<keyof OnboardingData, string>>

interface OnboardingPageProps {
  onComplete?: () => void
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [screen, setScreen] = useState(1)
  const [data, setData] = useState<OnboardingData>(initialData)
  const [errors, setErrors] = useState<Errors>({})
  const [saving, setSaving] = useState(false)
  const [direction, setDirection] = useState<'fwd' | 'back'>('fwd')
  const [transitioning, setTransitioning] = useState(false)

  const validate = (s: number, d: OnboardingData): Errors => {
    const e: Errors = {}
    if (s === 2 && !d.petType)           e.petType  = t('onboarding.screen2.error')
    if (s === 3 && !d.petName.trim())    e.petName  = t('onboarding.screen3.errors.nameRequired')
    if (s === 3 && d.petAge && isNaN(Number(d.petAge))) e.petAge = t('onboarding.screen3.errors.ageInvalid')
    if (s === 4 && !d.ownerName.trim())  e.ownerName  = t('onboarding.screen4.errors.nameRequired')
    if (s === 4 && !d.ownerEmail.trim()) e.ownerEmail = t('onboarding.screen4.errors.emailRequired')
    if (s === 4 && d.ownerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.ownerEmail))
      e.ownerEmail = t('onboarding.screen4.errors.emailInvalid')
    return e
  }

  const onChange = useCallback((field: keyof OnboardingData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }, [])

  const goTo = (next: number) => {
    setDirection(next > screen ? 'fwd' : 'back')
    setTransitioning(true)
    setTimeout(() => { setScreen(next); setTransitioning(false) }, 200)
  }

  const handleNext = async () => {
    const errs = validate(screen, data)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    if (screen === 5) {
      await save()
    } else if (screen < TOTAL) {
      goTo(screen + 1)
    }
  }

  const save = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.from('onboarding').insert([{
        user_id:    user?.id ?? null,
        owner_name: data.ownerName,
        owner_email:data.ownerEmail,
        pet_type:   data.petType,
        pet_name:   data.petName,
        pet_age:    data.petAge ? Number(data.petAge) : null,
        pet_breed:  data.petBreed || null,
      }])
      if (error) throw error
    } catch (err) {
      console.error('Supabase error:', err)
    } finally {
      setSaving(false)
      goTo(6)
    }
  }

  if (screen === 1) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex flex-col max-w-md w-full mx-auto">
          <Screen1Welcome onNext={() => goTo(2)} />
        </div>
      </div>
    )
  }

  if (screen === 6) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex flex-col max-w-md w-full mx-auto">
          <Screen6Done data={data} onFinish={() => onComplete?.()} />
        </div>
      </div>
    )
  }

  const slideClass = transitioning
    ? direction === 'fwd' ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'
    : 'opacity-100 translate-x-0'

  const isLast = screen === 5
  const showNextLabel = isLast ? (saving ? t('common.saving') : t('onboarding.startBtn')) : t('onboarding.nextBtn')

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      <div className="flex-1 flex flex-col max-w-md w-full mx-auto">

        {/* Header */}
        <div className="px-6 pt-10 pb-4 space-y-4">
          <ProgressBar current={screen - 1} total={TOTAL - 2} />
          <div className="flex items-center justify-between">
            <button
              onClick={() => goTo(screen - 1)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 -mr-1"
              aria-label={t('common.back')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M15 18l6-6-6-6" />
              </svg>
            </button>
            <span className="text-xs text-muted-foreground">{screen - 1} / {TOTAL - 2}</span>
          </div>
        </div>

        {/* תוכן */}
        <div className={`flex-1 transition-all duration-200 ease-out ${slideClass}`}>
          {screen === 2 && <Screen2PetType data={data} onChange={onChange} error={errors.petType} />}
          {screen === 3 && <Screen3PetDetails data={data} onChange={onChange} errors={errors} />}
          {screen === 4 && <Screen4Owner data={data} onChange={onChange} errors={errors} />}
          {screen === 5 && <Screen5Features />}
        </div>

        {/* כפתור המשך */}
        <div className="px-6 pb-10 pt-4">
          <button
            onClick={handleNext}
            disabled={saving}
            className="w-full py-4 rounded-xl bg-gradient-primary text-white text-base font-semibold
              shadow-button hover:shadow-button-hover hover:opacity-95 active:scale-[0.98]
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all duration-200"
          >
            {showNextLabel}
          </button>
        </div>

      </div>
    </div>
  )
}
