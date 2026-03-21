import React from 'react'

interface StepIndicatorProps {
  current: number
  total: number
  labels: string[]
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ current, total, labels }) => {
  return (
    <div dir="rtl" className="w-full">
      {/* שורת שלבים */}
      <div className="flex items-center justify-between relative">
        {/* קו מחבר ברקע */}
        <div className="absolute top-4 right-4 left-4 h-0.5 bg-purple-100 -z-10" />
        <div
          className="absolute top-4 right-4 h-0.5 bg-gradient-to-l from-purple-500 via-violet-500 to-fuchsia-500 -z-10 transition-all duration-500"
          style={{ width: `${((current - 1) / (total - 1)) * (100 - (8 / total))}%` }}
        />

        {Array.from({ length: total }, (_, i) => {
          const step = i + 1
          const isDone = step < current
          const isActive = step === current

          return (
            <div key={step} className="flex flex-col items-center gap-2">
              <div
                className={[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                  'transition-all duration-300 ring-2 ring-offset-2',
                  isDone
                    ? 'bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white ring-purple-300'
                    : isActive
                    ? 'bg-white text-purple-600 ring-purple-400 shadow-md shadow-purple-200'
                    : 'bg-gray-100 text-gray-400 ring-gray-200',
                ].join(' ')}
              >
                {isDone ? '✓' : step}
              </div>
              <span
                className={[
                  'text-xs font-medium transition-colors duration-300',
                  isActive ? 'text-purple-600' : isDone ? 'text-purple-400' : 'text-gray-400',
                ].join(' ')}
              >
                {labels[i]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
