import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        border:     'hsl(var(--border))',
        input:      'hsl(var(--input))',
        ring:       'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT:   'hsl(var(--primary))',
          foreground:'hsl(var(--primary-foreground))',
          hover:     'hsl(var(--primary-hover))',
          light:     'hsl(var(--primary-light))',
          dark:      'hsl(var(--primary-dark))',
          pressed:   'hsl(var(--primary-pressed))',
        },
        secondary: {
          DEFAULT:   'hsl(var(--secondary))',
          foreground:'hsl(var(--secondary-foreground))',
          light:     'hsl(var(--secondary-light))',
          dark:      'hsl(var(--secondary-dark))',
        },
        accent: {
          DEFAULT:   'hsl(var(--accent))',
          foreground:'hsl(var(--accent-foreground))',
          hover:     'hsl(var(--accent-hover))',
          light:     'hsl(var(--accent-light))',
        },
        muted: {
          DEFAULT:   'hsl(var(--muted))',
          foreground:'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT:   'hsl(var(--destructive))',
          foreground:'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT:   'hsl(var(--success))',
          foreground:'hsl(var(--success-foreground))',
        },
        card: {
          DEFAULT:   'hsl(var(--card))',
          foreground:'hsl(var(--card-foreground))',
          border:    'hsl(var(--card-border))',
        },
        popover: {
          DEFAULT:   'hsl(var(--popover))',
          foreground:'hsl(var(--popover-foreground))',
        },
        petid: {
          blue:   'hsl(var(--petid-blue))',
          teal:   'hsl(var(--petid-teal))',
          gold:   'hsl(var(--petid-gold))',
          coral:  'hsl(var(--petid-coral))',
          heart:  'hsl(var(--petid-heart))',
        },
      },
      borderRadius: {
        lg:      'var(--radius)',
        xl:      'var(--radius-lg)',
        '2xl':   'var(--radius-xl)',
        '3xl':   '2rem',
        '4xl':   '2.5rem',
        organic: '1.375rem',
      },
      boxShadow: {
        sm:            'var(--shadow-sm)',
        DEFAULT:       'var(--shadow-md)',
        md:            'var(--shadow-md)',
        lg:            'var(--shadow-lg)',
        xl:            'var(--shadow-xl)',
        card:          'var(--shadow-card)',
        elevated:      'var(--shadow-elevated)',
        button:        'var(--shadow-button)',
        'button-hover':'var(--shadow-button-hover)',
        '2xl':         'var(--shadow-2xl)',
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-petid':   'var(--gradient-petid)',
        'gradient-warm':    'var(--gradient-warm)',
        'gradient-story':   'var(--gradient-story)',
        'gradient-subtle':  'var(--gradient-subtle)',
      },
      keyframes: {
        'bounce-in': {
          '0%':   { opacity: '0', transform: 'scale(0.3)' },
          '50%':  { transform: 'scale(1.05)' },
          '70%':  { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        'ripple': {
          '0%':   { transform: 'scale(0)', opacity: '0.6' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%':      { transform: 'rotate(-10deg) scale(1.15)' },
          '50%':      { transform: 'rotate(10deg) scale(1.2)' },
          '75%':      { transform: 'rotate(-5deg) scale(1.1)' },
        },
        'pulse-petid': {
          '0%, 100%': { boxShadow: '0 0 0 0 hsla(204, 100%, 48%, 0.4)' },
          '50%':      { boxShadow: '0 0 0 12px hsla(204, 100%, 48%, 0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'gradient-rotate': {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'fadeUp': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'walk': {
          from: { transform: 'translateX(-4px) rotate(-2deg)' },
          to:   { transform: 'translateX(4px) rotate(2deg)' },
        },
      },
      animation: {
        'bounce-in':       'bounce-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'slide-up':        'slide-up 0.3s ease-out',
        'fade-in':         'fade-in 0.3s ease-out',
        'shimmer':         'shimmer 1.5s infinite',
        'ripple':          'ripple 0.6s ease-out forwards',
        'wiggle':          'wiggle 0.3s ease-in-out',
        'pulse-petid':     'pulse-petid 2s ease-in-out infinite',
        'float':           'float 3s ease-in-out infinite',
        'gradient-rotate': 'gradient-rotate 3s ease infinite',
        'fadeUp':          'fadeUp 0.25s ease-out',
        'walk':            'walk 0.5s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
