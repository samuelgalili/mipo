import React from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
type Size = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps {
  label?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  loading?: boolean
  variant?: Variant
  size?: Size
  iconStart?: React.ReactNode
  iconEnd?: React.ReactNode
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  children?: React.ReactNode
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2',
  xl: 'px-10 py-5 text-lg gap-2.5',
}

const variants: Record<Variant, string> = {
  primary: [
    'bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500',
    'text-white shadow-lg shadow-purple-500/30',
    'hover:from-purple-600 hover:via-violet-600 hover:to-fuchsia-600',
    'hover:shadow-xl hover:shadow-purple-500/40',
  ].join(' '),
  secondary: 'bg-white border-2 border-purple-400 text-purple-600 hover:bg-purple-50 hover:border-purple-500 shadow-sm',
  ghost: 'bg-transparent text-purple-600 hover:bg-purple-50',
  outline: 'bg-transparent border border-purple-300 text-purple-500 hover:bg-purple-50 hover:border-purple-400',
  danger: 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/30 hover:from-red-600 hover:to-rose-600',
}

const Spinner = () => (
  <svg className="animate-spin h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
  </svg>
)

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  fullWidth = false,
  type = 'button',
  className = '',
  children,
}) => {
  const base = [
    'relative inline-flex items-center justify-center',
    'font-semibold rounded-2xl',
    'transition-all duration-300 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2',
    'select-none',
    fullWidth ? 'w-full' : '',
    disabled || loading ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'hover:scale-[1.03] active:scale-95',
  ].filter(Boolean).join(' ')

  return (
    <button
      dir="rtl"
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <>
          <Spinner />
          <span>טוען...</span>
        </>
      ) : (
        <>
          {iconStart && <span className="shrink-0" aria-hidden="true">{iconStart}</span>}
          {label && <span>{label}</span>}
          {children}
          {iconEnd && <span className="shrink-0" aria-hidden="true">{iconEnd}</span>}
        </>
      )}
    </button>
  )
}
