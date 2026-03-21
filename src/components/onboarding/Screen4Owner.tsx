import React from 'react'
import type { OnboardingData } from '../../types/onboarding'

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
  autoComplete?: string
  required?: boolean
}> = ({ label, value, onChange, placeholder, type = 'text', error, autoComplete, required }) => (
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
      autoComplete={autoComplete}
      className={[
        'w-full bg-transparent text-gray-900 text-lg placeholder:text-gray-300',
        'border-b-2 py-2 outline-none transition-colors duration-200',
        error ? 'border-red-400' : 'border-gray-200 focus:border-[#7C3AED]',
      ].join(' ')}
    />
    {error && <p className="text-xs text-red-500">⚠ {error}</p>}
  </div>
)

export const Screen4Owner: React.FC<Props> = ({ data, onChange, errors }) => (
  <div className="flex flex-col gap-7 px-6 py-8">
    <div>
      <h2
        className="text-3xl text-gray-900 leading-snug"
        style={{ fontFamily: '"DM Serif Display", serif' }}
      >
        ואיך
        <br />
        קוראים לך?
      </h2>
      <p className="text-gray-400 text-sm mt-2">הפרטים שלך בלבד</p>
    </div>

    <div className="flex flex-col gap-6">
      <MinimalInput
        label="שם מלא"
        value={data.ownerName}
        onChange={(v) => onChange('ownerName', v)}
        placeholder="ישראל ישראלי"
        autoComplete="name"
        error={errors.ownerName}
        required
      />
      <MinimalInput
        label="אימייל"
        type="email"
        value={data.ownerEmail}
        onChange={(v) => onChange('ownerEmail', v)}
        placeholder="israel@example.com"
        autoComplete="email"
        error={errors.ownerEmail}
        required
      />
    </div>
  </div>
)
