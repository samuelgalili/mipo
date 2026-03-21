import React from 'react'
import { Input } from '../ui/Input'
import type { OnboardingData } from '../../types/onboarding'
import { PET_OPTIONS } from '../../types/onboarding'

interface Props {
  data: OnboardingData
  onChange: (field: keyof OnboardingData, value: string) => void
  errors: Partial<Record<keyof OnboardingData, string>>
}

export const Step3PetDetails: React.FC<Props> = ({ data, onChange, errors }) => {
  const petOption = PET_OPTIONS.find((p) => p.type === data.petType)

  return (
    <div dir="rtl" className="flex flex-col gap-6">
      <div className="text-center space-y-2">
        <div className="text-5xl">{petOption?.emoji ?? '🐾'}</div>
        <h2 className="text-2xl font-bold text-gray-800">פרטי החיה שלך</h2>
        <p className="text-gray-500 text-sm">ספר לנו קצת על ה{petOption?.label ?? 'חיה'} שלך</p>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          label="שם החיה"
          placeholder="למשל: בובו, לונה, ריו..."
          value={data.petName}
          onChange={(e) => onChange('petName', e.target.value)}
          error={errors.petName}
          iconStart={petOption?.emoji ?? '🐾'}
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="גיל (בשנים)"
            placeholder="2"
            type="number"
            value={data.petAge}
            onChange={(e) => onChange('petAge', e.target.value)}
            error={errors.petAge}
            hint="ניתן להכניס גם 0.5"
          />
          <Input
            label="גזע"
            placeholder="מעורב, לא ידוע..."
            value={data.petBreed}
            onChange={(e) => onChange('petBreed', e.target.value)}
            error={errors.petBreed}
          />
        </div>
      </div>
    </div>
  )
}
