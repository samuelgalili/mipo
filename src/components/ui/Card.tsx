import React from 'react'

type Variant = 'default' | 'elevated' | 'flat' | 'gradient'
type Padding = 'none' | 'sm' | 'md' | 'lg'

interface CardProps {
  children?: React.ReactNode
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  headerRight?: React.ReactNode
  hover?: boolean
  onClick?: () => void
  variant?: Variant
  padding?: Padding
  className?: string
}

const variantStyles: Record<Variant, string> = {
  default: 'bg-white border border-purple-100 shadow-md shadow-purple-100/40',
  elevated: 'bg-white border border-purple-100 shadow-xl shadow-purple-200/50',
  flat: 'bg-purple-50/50 border border-purple-100',
  gradient: 'bg-gradient-to-br from-white via-purple-50/30 to-fuchsia-50/30 border border-purple-100 shadow-md shadow-purple-100/40',
}

const paddingStyles: Record<Padding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  headerRight,
  hover = false,
  onClick,
  variant = 'default',
  padding = 'md',
  className = '',
}) => {
  const isClickable = hover || Boolean(onClick)

  const base = [
    'rounded-3xl overflow-hidden transition-all duration-300',
    variantStyles[variant],
    isClickable ? 'cursor-pointer hover:shadow-xl hover:shadow-purple-200/50 hover:-translate-y-1 active:scale-[0.99]' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div
      dir="rtl"
      className={base}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
    >
      <div className={paddingStyles[padding]}>
        {(title || subtitle || headerRight) && (
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              {title && <h3 className="text-lg font-bold text-gray-800 leading-snug">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
            </div>
            {headerRight && <div className="shrink-0">{headerRight}</div>}
          </div>
        )}
        {children && <div>{children}</div>}
        {footer && (
          <div className="mt-4 pt-4 border-t border-purple-50 text-sm text-gray-500">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
