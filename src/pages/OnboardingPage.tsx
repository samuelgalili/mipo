import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import type { OnboardingData } from '../types/onboarding'
import { StepIndicator } from '../components/onboarding/StepIndicator'
import { Step1Owner } from '../components/onboarding/Step1Owner'
import { Step2PetType } from '../components/onboarding/Step2PetType'
import { Step3PetDetails } from '../components/onboarding/Step3PetDetails'
import { StepDone } from '../components/onboarding/StepDone'
import { Button } from '../components/ui/Button'

const TOTAL_STEPS = 3
const STEP_LABELS = ['פרטים שלי', 'סוג חיה', 'פרטי חיה']

const initialData: OnboardingData = {
  ownerName: '',
  ownerEmail: '',
  petType: '',
  petName: '',
  petAge: '',
  petBreed: '',
}

type Errors = Partial<Record<keyof OnboardingData, string>>

function validate(step: number, data: OnboardingData): Errors {
  const errors: Errors = {}
  if (step === 1) {
    if (!data.ownerName.trim()) errors.ownerName = 'שם חובה'
    if (!data.ownerEmail.trim()) errors.ownerEmail = 'אימייל חובה'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.ownerEmail))
      errors.ownerEmail = 'אימייל לא תקין'
  }
  if (step === 2) {
    if (!data.petType) errors.petType = 'יש לבחור סוג חיה'
  }
  if (step === 3) {
    if (!data.petName.trim()) errors.petName = 'שם החיה חובה'
    if (data.petAge && isNaN(Number(data.petAge))) errors.petAge = 'גיל לא תקין'
  }
  return errors
}

interface OnboardingPageProps {
  onComplete?: () => void
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [data, setData] = useState<OnboardingData>(initialData)
  const [errors, setErrors] = useState<Errors>({})
  const [saving, setSaving] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [animating, setAnimating] = useState(false)

  const onChange = (field: keyof OnboardingData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const goTo = (next: number) => {
    setDirection(next > step ? 'forward' : 'back')
    setAnimating(true)
    setTimeout(() => {
      setStep(next)
      setAnimating(false)
    }, 180)
  }

  const handleNext = async () => {
    const stepErrors = validate(step, data)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setErrors({})

    if (step === TOTAL_STEPS) {
      await saveToSupabase()
    } else {
      goTo(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) goTo(step - 1)
  }

  const saveToSupabase = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.from('onboarding').insert([
        {
          user_id: user?.id ?? null,
          owner_name: data.ownerName,
          owner_email: data.ownerEmail,
          pet_type: data.petType,
          pet_name: data.petName,
          pet_age: data.petAge ? Number(data.petAge) : null,
          pet_breed: data.petBreed || null,
        },
      ])
      if (error) throw error
      setDone(true)
    } catch (err) {
      console.error('Supabase save error:', err)
      // גם אם Supabase לא מוגדר — ממשיכים להצגת ה-done screen
      setDone(true)
    } finally {
      setSaving(false)
    }
  }

  const slideClass = animating
    ? direction === 'forward'
      ? 'opacity-0 -translate-x-4'
      : 'opacity-0 translate-x-4'
    : 'opacity-100 translate-x-0'

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        {/* לוגו */}
        <div className="text-center mb-8">
          <span className="text-4xl font-black bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            🐾 MIPO
          </span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-purple-100/60 border border-purple-100 p-6 sm:p-8">
          {done ? (
            <StepDone data={data} onFinish={() => onComplete?.()} />
          ) : (
            <>
              {/* מד התקדמות */}
              <div className="mb-8">
                <StepIndicator current={step} total={TOTAL_STEPS} labels={STEP_LABELS} />
              </div>

              {/* תוכן השלב */}
              <div className={`transition-all duration-200 ease-in-out ${slideClass}`}>
                {step === 1 && <Step1Owner data={data} onChange={onChange} errors={errors} />}
                {step === 2 && <Step2PetType data={data} onChange={onChange} errors={errors} />}
                {step === 3 && <Step3PetDetails data={data} onChange={onChange} errors={errors} />}
              </div>

              {/* כפתורי ניווט */}
              <div className="mt-8 flex gap-3">
                {step > 1 && (
                  <Button
                    label="חזרה"
                    variant="ghost"
                    onClick={handleBack}
                    className="flex-1"
                  />
                )}
                <Button
                  label={step === TOTAL_STEPS ? 'סיום ✓' : 'המשך'}
                  onClick={handleNext}
                  loading={saving}
                  fullWidth={step === 1}
                  className="flex-[2]"
                />
              </div>

              {/* מונה שלבים */}
              <p className="text-center text-xs text-gray-400 mt-4">
                שלב {step} מתוך {TOTAL_STEPS}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
