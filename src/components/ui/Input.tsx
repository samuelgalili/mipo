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
  const inputId   = `mipo-input-${uid}`
  const errorId   = `mipo-error-${uid}`
  const hintId    = `mipo-hint-${uid}`
  const isTextarea = type === 'textarea'

  const inputBase = [
    'flex w-full bg-background text-foreground text-sm',
    'placeholder:text-muted-foreground',
    'outline-none transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    iconStart ? 'pe-10 ps-4' : 'px-4',
    isTextarea ? 'py-3 rounded-xl resize-none' : 'h-11 py-3 rounded-xl',
    'border',
    error
      ? 'border-destructive focus:ring-2 focus:ring-destructive/30'
      : 'border-input focus:ring-2 focus:ring-ring/30 focus:border-primary',
  ].filter(Boolean).join(' ')

  const sharedProps = {
    id:          inputId,
    name,
    value,
    onChange,
    placeholder,
    disabled,
    required,
    autoComplete,
    dir: 'auto' as const,
    'aria-invalid':      error ? ('true' as const) : undefined,
    'aria-describedby':  [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined,
    className: inputBase,
  }

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-foreground flex items-center gap-1">
          {label}
          {required && <span className="text-destructive text-xs" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        {iconStart && (
          <span className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {iconStart}
          </span>
        )}
        {isTextarea
          ? <textarea {...sharedProps} rows={rows} />
          : <input    {...sharedProps} type={type} />
        }
      </div>
      {hint && !error && <p id={hintId} className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-destructive flex items-center gap-1">
          <span aria-hidden="true">⚠</span>{error}
        </p>
      )}
    </div>
  )
}
