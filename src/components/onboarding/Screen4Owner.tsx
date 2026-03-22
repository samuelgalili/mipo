import React from 'react'
import { useTranslation } from 'react-i18next'
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
    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
      {label}{required && <span className="text-primary mr-0.5">*</span>}
    </label>
    <input
      dir="auto"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={[
        'w-full bg-transparent text-foreground text-lg placeholder:text-muted-foreground/50',
        'border-b-2 py-2 outline-none transition-colors duration-200',
        error ? 'border-destructive' : 'border-border focus:border-primary',
      ].join(' ')}
    />
    {error && <p className="text-xs text-destructive">⚠ {error}</p>}
  </div>
)

export const Screen4Owner: React.FC<Props> = ({ data, onChange, errors }) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-7 px-6 py-8">
      <div>
        <h2
          className="text-3xl text-foreground leading-snug whitespace-pre-line"
          style={{ fontFamily: '"DM Serif Display", serif' }}
        >
          {t('onboarding.screen4.title')}
        </h2>
        <p className="text-muted-foreground text-sm mt-2">{t('onboarding.screen4.subtitle')}</p>
      </div>

      <div className="flex flex-col gap-6">
        <MinimalInput
          label={t('onboarding.screen4.fullName')}
          value={data.ownerName}
          onChange={(v) => onChange('ownerName', v)}
          placeholder={t('onboarding.screen4.namePlaceholder')}
          autoComplete="name"
          error={errors.ownerName}
          required
        />
        <MinimalInput
          label={t('onboarding.screen4.email')}
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
}
