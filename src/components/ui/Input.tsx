import React, { useId } from 'react'

interface InputProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search' | 'textarea'
  error?: string | null
  hint?: string
  iconStart?: React.ReactNode
  disabled?: boolean
  required?: boolean
  rows?: number
  name?: string
  autoComplete?: string
  className?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder = '',
  value,
  onChange,
  type = 'text',
  error,
  hint,
  iconStart,
  disabled = false,
  required = false,
  rows = 4,
  name,
  autoComplete,
  className = '',
}) => {
  const uid = useId()
  const inputId = `mipo-input-${uid}`
  const errorId = `mipo-error-${uid}`
  const hintId = `mipo-hint-${uid}`
  const isTextarea = type === 'textarea'

  const inputBase = [
    'w-full text-sm text-gray-800 bg-white',
    'placeholder:text-gray-300',
    'outline-none transition-all duration-200',
    'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
    iconStart ? 'pe-10 ps-4' : 'pe-4 ps-4',
    isTextarea ? 'py-3 rounded-2xl resize-none' : 'py-3 rounded-xl',
    error
      ? 'border border-red-400 focus:ring-2 focus:ring-red-300'
      : 'border border-purple-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-400',
  ].filter(Boolean).join(' ')

  const sharedProps = {
    id: inputId,
    name,
    value,
    onChange,
    placeholder,
    disabled,
    required,
    autoComplete,
    dir: 'rtl' as const,
    'aria-invalid': error ? ('true' as const) : undefined,
    'aria-describedby': [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined,
    className: inputBase,
  }

  return (
    <div dir="rtl" className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-gray-700 flex items-center gap-1">
          {label}
          {required && <span className="text-fuchsia-500 text-xs" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        {iconStart && (
          <span className="absolute end-3 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none" aria-hidden="true">
            {iconStart}
          </span>
        )}
        {isTextarea
          ? <textarea {...sharedProps} rows={rows} />
          : <input {...sharedProps} type={type} />
        }
      </div>
      {hint && !error && <p id={hintId} className="text-xs text-gray-400">{hint}</p>}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-500 flex items-center gap-1">
          <span aria-hidden="true">⚠</span>{error}
        </p>
      )}
    </div>
  )
}
