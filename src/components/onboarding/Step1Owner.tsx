import React from 'react'
import { Input } from '../ui/Input'
import type { OnboardingData } from '../../types/onboarding'

interface Props {
  data: OnboardingData
  onChange: (field: keyof OnboardingData, value: string) => void
  errors: Partial<Record<keyof OnboardingData, string>>
}

export const Step1Owner: React.FC<Props> = ({ data, onChange, errors }) => {
  return (
    <div dir="rtl" className="flex flex-col gap-6">
      <div className="text-center space-y-2">
        <div className="text-5xl">👋</div>
        <h2 className="text-2xl font-bold text-gray-800">ברוכים הבאים ל-MIPO</h2>
        <p className="text-gray-500 text-sm">נתחיל עם הפרטים שלך</p>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          label="שם מלא"
          placeholder="ישראל ישראלי"
          value={data.ownerName}
          onChange={(e) => onChange('ownerName', e.target.value)}
          error={errors.ownerName}
          iconStart="👤"
          required
          autoComplete="name"
        />
        <Input
          label="אימייל"
          placeholder="israel@example.com"
          type="email"
          value={data.ownerEmail}
          onChange={(e) => onChange('ownerEmail', e.target.value)}
          error={errors.ownerEmail}
          iconStart="✉️"
          required
          autoComplete="email"
        />
      </div>
    </div>
  )
}
