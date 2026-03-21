import React from 'react'
import type { OnboardingData } from '../../types/onboarding'
import { PET_OPTIONS } from '../../types/onboarding'

interface Props {
  data: OnboardingData
  onChange: (field: keyof OnboardingData, value: string) => void
  errors: Partial<Record<keyof OnboardingData, string>>
}

const MinimalInput: React.FC<{
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type?: string
  error?: string
  required?: boolean
}> = ({ label, value, onChange, placeholder, type = 'text', error, required }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
      {label}{required && <span className="text-[#7C3AED] mr-0.5">*</span>}
    </label>
    <input
      dir="rtl"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={[
        'w-full bg-transparent text-gray-900 text-lg placeholder:text-gray-300',
        'border-b-2 py-2 outline-none transition-colors duration-200',
        error ? 'border-red-400' : 'border-gray-200 focus:border-[#7C3AED]',
      ].join(' ')}
    />
    {error && <p className="text-xs text-red-500">⚠ {error}</p>}
  </div>
)

export const Screen3PetDetails: React.FC<Props> = ({ data, onChange, errors }) => {
  const pet = PET_OPTIONS.find((p) => p.type === data.petType)

  return (
    <div className="flex flex-col gap-7 px-6 py-8">
      <div>
        <p className="text-3xl mb-1">{pet?.emoji}</p>
        <h2
          className="text-3xl text-gray-900 leading-snug"
          style={{ fontFamily: '"DM Serif Display", serif' }}
        >
          פרטי ה{pet?.label ?? 'חיה'}
          <br />
          שלך
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        <MinimalInput
          label="שם"
          value={data.petName}
          onChange={(v) => onChange('petName', v)}
          placeholder="בובו, לונה, ריו..."
          error={errors.petName}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <MinimalInput
            label="גיל"
            value={data.petAge}
            onChange={(v) => onChange('petAge', v)}
            placeholder="2"
            type="number"
            error={errors.petAge}
          />
          <MinimalInput
            label="גזע"
            value={data.petBreed}
            onChange={(v) => onChange('petBreed', v)}
            placeholder="מעורב..."
          />
        </div>
      </div>

      {/* תמונת רקע קטנה */}
      {pet?.photo && (
        <div className="mt-auto rounded-2xl overflow-hidden h-32">
          <img src={pet.photo} alt={pet.label} className="w-full h-full object-cover opacity-60" />
        </div>
      )}
    </div>
  )
}
