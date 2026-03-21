import React from 'react'

interface ProgressBarProps {
  current: number  // 1-based
  total: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => (
  <div className="flex gap-1.5 w-full">
    {Array.from({ length: total }, (_, i) => (
      <div
        key={i}
        className={[
          'h-[3px] flex-1 rounded-full transition-all duration-500',
          i < current ? 'bg-[#7C3AED]' : 'bg-gray-200',
        ].join(' ')}
      />
    ))}
  </div>
)
