import React, { useRef, useState } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'petid' | 'gold' | 'coral'
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
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-6 text-sm gap-2',
  lg: 'h-12 px-8 text-base gap-2',
  xl: 'h-14 px-10 text-base gap-2.5',
}

const variants: Record<Variant, string> = {
  primary:   'bg-primary text-primary-foreground shadow-button hover:bg-primary-hover hover:shadow-button-hover active:bg-primary-pressed',
  petid:     'bg-gradient-primary text-white shadow-button hover:shadow-button-hover hover:opacity-95',
  secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-dark',
  ghost:     'bg-transparent text-foreground hover:bg-muted/50',
  outline:   'bg-transparent border-2 border-border text-foreground hover:bg-muted/50 hover:border-primary/50',
  danger:    'bg-destructive text-destructive-foreground shadow-button hover:opacity-90',
  gold:      'bg-petid-gold text-petid-gold-foreground shadow-button hover:opacity-90',
  coral:     'bg-petid-coral text-white shadow-button hover:opacity-90',
}

interface RippleItem { left: number; top: number; size: number }

const Spinner = () => (
  <svg className="animate-spin h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
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
  const btnRef = useRef<HTMLButtonElement>(null)
  const [ripples, setRipples] = useState<RippleItem[]>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      const rippleSize = Math.max(rect.width, rect.height) * 2
      const ripple: RippleItem = {
        left: e.clientX - rect.left - rippleSize / 2,
        top:  e.clientY - rect.top  - rippleSize / 2,
        size: rippleSize,
      }
      setRipples(prev => [...prev, ripple])
      setTimeout(() => setRipples(prev => prev.slice(1)), 600)
    }
    onClick?.(e)
  }

  const base = [
    'relative inline-flex items-center justify-center overflow-hidden',
    'font-semibold rounded-xl',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'select-none',
    'active:scale-[0.98]',
    fullWidth ? 'w-full' : '',
    disabled || loading ? 'opacity-60 cursor-not-allowed pointer-events-none' : '',
  ].filter(Boolean).join(' ')

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={handleClick}
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
          {iconStart && <span className="shrink-0">{iconStart}</span>}
          {label && <span>{label}</span>}
          {children}
          {iconEnd && <span className="shrink-0">{iconEnd}</span>}
        </>
      )}
      {ripples.map((r, i) => (
        <span
          key={i}
          className="absolute rounded-full pointer-events-none animate-ripple"
          style={{
            left:   r.left,
            top:    r.top,
            width:  r.size,
            height: r.size,
            backgroundColor:
              variant === 'ghost' || variant === 'outline' || variant === 'secondary'
                ? 'rgba(0,0,0,0.08)'
                : 'rgba(255,255,255,0.3)',
          }}
        />
      ))}
    </button>
  )
}
