import React from 'react'
import type { OnboardingData } from '../../types/onboarding'
import { PET_OPTIONS } from '../../types/onboarding'

interface Props {
  data: OnboardingData
  onChange: (field: keyof OnboardingData, value: string) => void
  error?: string
}

export const Screen2PetType: React.FC<Props> = ({ data, onChange, error }) => (
  <div className="flex flex-col gap-6 px-6 py-8">
    <div>
      <h2
        className="text-3xl text-gray-900 leading-snug"
        style={{ fontFamily: '"DM Serif Display", serif' }}
      >
        איזו חיה
        <br />
        יש לך?
      </h2>
      <p className="text-gray-400 text-sm mt-2">בחר סוג — ניתן להוסיף עוד מאוחר</p>
    </div>

    <div className="grid grid-cols-2 gap-3">
      {PET_OPTIONS.map(({ type, label, photo }) => {
        const selected = data.petType === type
        return (
          <button
            key={type}
            type="button"
            onClick={() => onChange('petType', type)}
            className={[
              'relative rounded-2xl overflow-hidden aspect-square',
              'transition-all duration-200 active:scale-[0.97]',
              'focus:outline-none',
              selected ? 'ring-2 ring-[#7C3AED] ring-offset-2' : '',
            ].join(' ')}
          >
            {/* תמונה */}
            <img
              src={photo}
              alt={label}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Overlay */}
            <div className={[
              'absolute inset-0 transition-all duration-200',
              selected
                ? 'bg-[#7C3AED]/30'
                : 'bg-black/10 hover:bg-black/5',
            ].join(' ')} />
            {/* שם */}
            <div className="absolute bottom-0 inset-x-0 px-3 py-2.5 bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-white text-sm font-semibold">{label}</span>
            </div>
            {/* V */}
            {selected && (
              <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center shadow-md">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </button>
        )
      })}
    </div>

    {error && (
      <p role="alert" className="text-xs text-red-500 text-center">⚠ {error}</p>
    )}
  </div>
)
