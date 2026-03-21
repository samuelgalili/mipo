import React from 'react'
import type { OnboardingData } from '../../types/onboarding'
import { PET_OPTIONS } from '../../types/onboarding'

interface Props {
  data: OnboardingData
  onChange: (field: keyof OnboardingData, value: string) => void
  errors: Partial<Record<keyof OnboardingData, string>>
}

export const Step2PetType: React.FC<Props> = ({ data, onChange, errors }) => {
  return (
    <div dir="rtl" className="flex flex-col gap-6">
      <div className="text-center space-y-2">
        <div className="text-5xl">🐾</div>
        <h2 className="text-2xl font-bold text-gray-800">איזו חיה יש לך?</h2>
        <p className="text-gray-500 text-sm">ניתן להוסיף עוד חיות מחמד לאחר ההרשמה</p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {PET_OPTIONS.map(({ type, emoji, label }) => {
          const isSelected = data.petType === type
          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange('petType', type)}
              className={[
                'flex flex-col items-center gap-2 p-4 rounded-2xl border-2',
                'transition-all duration-200 font-medium text-sm',
                'focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1',
                'hover:scale-105 active:scale-95',
                isSelected
                  ? 'border-purple-400 bg-purple-50 text-purple-700 shadow-md shadow-purple-100'
                  : 'border-gray-200 bg-white text-gray-500 hover:border-purple-200 hover:bg-purple-50/50',
              ].join(' ')}
              aria-pressed={isSelected}
            >
              <span className="text-3xl leading-none">{emoji}</span>
              <span>{label}</span>
            </button>
          )
        })}
      </div>

      {errors.petType && (
        <p role="alert" className="text-xs text-red-500 text-center flex items-center justify-center gap-1">
          <span aria-hidden="true">⚠</span>{errors.petType}
        </p>
      )}
    </div>
  )
}
