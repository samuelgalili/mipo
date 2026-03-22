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
  default:  'bg-card border border-card-border shadow-card',
  elevated: 'bg-card border border-card-border shadow-elevated',
  flat:     'bg-secondary border border-border',
  gradient: 'bg-gradient-subtle border border-card-border shadow-card',
}

const paddingStyles: Record<Padding, string> = {
  none: '',
  sm:   'p-3',
  md:   'p-5',
  lg:   'p-7',
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
    'rounded-organic overflow-hidden transition-all duration-200',
    variantStyles[variant],
    isClickable
      ? 'cursor-pointer hover:shadow-elevated hover:-translate-y-0.5 active:scale-[0.99]'
      : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div
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
              {title    && <h3 className="text-lg font-bold text-foreground leading-snug">{title}</h3>}
              {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
            </div>
            {headerRight && <div className="shrink-0">{headerRight}</div>}
          </div>
        )}
        {children && <div>{children}</div>}
        {footer && (
          <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
