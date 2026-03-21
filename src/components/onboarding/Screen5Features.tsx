import React from 'react'

const FEATURES = [
  {
    icon: '🤝',
    title: 'Dog Companion',
    desc: 'ליווי יומיומי — תזכורות, טיפים, ואהבה',
  },
  {
    icon: '🪞',
    title: 'Parallel Life',
    desc: 'ראה את העולם מנקודת המבט של החיה שלך',
  },
  {
    icon: '🤖',
    title: 'AI Chat',
    desc: 'שוחח עם Mipo — הבינה המלאכותית שמכירה את החיה שלך',
  },
  {
    icon: '🛍️',
    title: 'חנות',
    desc: 'מוצרים מותאמים אישית לחיה שלך',
  },
]

export const Screen5Features: React.FC = () => (
  <div className="flex flex-col gap-6 px-6 py-8">
    <div>
      <h2
        className="text-3xl text-gray-900 leading-snug"
        style={{ fontFamily: '"DM Serif Display", serif' }}
      >
        מה מחכה לכם
        <br />
        ב-MIPO
      </h2>
      <p className="text-gray-400 text-sm mt-2">בנינו את זה בשבילכם 🐾</p>
    </div>

    <div className="flex flex-col gap-3">
      {FEATURES.map((f) => (
        <div
          key={f.title}
          className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-purple-50/60 transition-colors duration-200"
        >
          <span className="text-2xl shrink-0 mt-0.5">{f.icon}</span>
          <div>
            <p className="font-semibold text-gray-800 text-sm">{f.title}</p>
            <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)
