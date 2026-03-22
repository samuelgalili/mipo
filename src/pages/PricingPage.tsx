import React from 'react'
import { LegalLayout } from './legal/LegalLayout'

const check = <span className="text-purple-500 font-bold">✓</span>
const cross  = <span className="text-gray-300">✕</span>

const PlanCard: React.FC<{
  name: string; price: string; period: string; desc: string;
  features: { label: string; included: boolean }[];
  highlight?: boolean; badge?: string;
}> = ({ name, price, period, desc, features, highlight, badge }) => (
  <div className={`relative rounded-2xl border p-6 flex flex-col gap-4 transition-all ${
    highlight
      ? 'border-purple-300 bg-gradient-to-b from-purple-50 to-white shadow-lg shadow-purple-100/60'
      : 'border-gray-200 bg-white'
  }`}>
    {badge && (
      <span className="absolute -top-3 right-6 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-xs font-bold px-3 py-1 rounded-full">
        {badge}
      </span>
    )}
    <div>
      <h3 className="text-lg font-bold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </div>
    <div className="flex items-end gap-1">
      <span className="text-3xl font-extrabold text-gray-900">{price}</span>
      <span className="text-sm text-gray-400 mb-1">{period}</span>
    </div>
    <ul className="space-y-2 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
          {f.included ? check : cross}
          <span className={f.included ? '' : 'text-gray-400'}>{f.label}</span>
        </li>
      ))}
    </ul>
    <a
      href="/"
      className={`text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
        highlight
          ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:opacity-90 shadow-md shadow-purple-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {price === '₪0' ? 'התחל בחינם' : 'בחר תוכנית'}
    </a>
  </div>
)

const heContent = (
  <>
    <h1>תמחור 🐾</h1>
    <p>תוכניות פשוטות ושקופות — ללא עלויות נסתרות.</p>

    <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
      <PlanCard
        name="חינם"
        price="₪0"
        period="לנצח"
        desc="לגלות את MIPO בלי התחייבות"
        features={[
          { label: 'פרופיל חיה אחת', included: true },
          { label: 'טיפים יומיים בסיסיים', included: true },
          { label: 'עדכוני בריאות בסיסיים', included: true },
          { label: 'AI Companion (Mipo)', included: false },
          { label: 'מספר חיות ללא הגבלה', included: false },
          { label: 'תמיכה מועדפת', included: false },
        ]}
      />
      <PlanCard
        name="Plus"
        price="₪29"
        period="/ חודש"
        desc="לבעלי חיות מחמד רציניים"
        highlight
        badge="הכי פופולרי"
        features={[
          { label: 'עד 3 חיות מחמד', included: true },
          { label: 'AI Companion (Mipo) ללא הגבלה', included: true },
          { label: 'תובנות התנהגות מתקדמות', included: true },
          { label: 'תזכורות וטרינריות', included: true },
          { label: 'היסטוריה רפואית מלאה', included: true },
          { label: 'תמיכה מועדפת', included: false },
        ]}
      />
      <PlanCard
        name="Pro"
        price="₪79"
        period="/ חודש"
        desc="לחובבי חיות סופר-מחויבים"
        features={[
          { label: 'חיות ללא הגבלה', included: true },
          { label: 'AI Companion + אנליזות עמוקות', included: true },
          { label: 'דוחות PDF חודשיים', included: true },
          { label: 'גישה מוקדמת לפיצ\'רים', included: true },
          { label: 'תמיכה ישירה 24/7', included: true },
          { label: 'API גישה (בקרוב)', included: true },
        ]}
      />
    </div>

    <h2>שאלות נפוצות</h2>

    <h3>האם אפשר לבטל בכל עת?</h3>
    <p>כן. ניתן לבטל את המנוי בכל עת מהגדרות החשבון. החיוב נפסק בסוף תקופת החיוב הנוכחית.</p>

    <h3>מה קורה לנתונים שלי אחרי ביטול?</h3>
    <p>הנתונים נשמרים 30 יום לאחר הביטול ואז נמחקים לצמיתות. ניתן לייצא את כל הנתונים לפני הביטול.</p>

    <h3>האם יש תקופת ניסיון?</h3>
    <p>כן — 7 ימים בחינם לכל תוכנית בתשלום, ללא צורך בכרטיס אשראי.</p>

    <h3>אילו אמצעי תשלום מתקבלים?</h3>
    <p>Visa, Mastercard, American Express ו-PayPal. כל התשלומים מאובטחים דרך Stripe.</p>

    <h3>יש הנחה לתשלום שנתי?</h3>
    <p>כן — תשלום שנתי מזכה בחודשיים חינם (חיסכון של ~17%).</p>
  </>
)

const enContent = (
  <>
    <h1>Pricing 🐾</h1>
    <p>Simple, transparent pricing — no hidden fees.</p>

    <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
      <PlanCard
        name="Free"
        price="₪0"
        period="forever"
        desc="Explore MIPO with no commitment"
        features={[
          { label: 'One pet profile', included: true },
          { label: 'Basic daily tips', included: true },
          { label: 'Basic health updates', included: true },
          { label: 'AI Companion (Mipo)', included: false },
          { label: 'Unlimited pets', included: false },
          { label: 'Priority support', included: false },
        ]}
      />
      <PlanCard
        name="Plus"
        price="₪29"
        period="/ month"
        desc="For serious pet owners"
        highlight
        badge="Most Popular"
        features={[
          { label: 'Up to 3 pets', included: true },
          { label: 'Unlimited AI Companion', included: true },
          { label: 'Advanced behavior insights', included: true },
          { label: 'Vet reminders', included: true },
          { label: 'Full medical history', included: true },
          { label: 'Priority support', included: false },
        ]}
      />
      <PlanCard
        name="Pro"
        price="₪79"
        period="/ month"
        desc="For the most dedicated pet lovers"
        features={[
          { label: 'Unlimited pets', included: true },
          { label: 'AI Companion + deep analytics', included: true },
          { label: 'Monthly PDF reports', included: true },
          { label: 'Early feature access', included: true },
          { label: '24/7 direct support', included: true },
          { label: 'API access (coming soon)', included: true },
        ]}
      />
    </div>

    <h2>FAQ</h2>

    <h3>Can I cancel anytime?</h3>
    <p>Yes. Cancel at any time from account settings. Billing stops at the end of the current billing period.</p>

    <h3>What happens to my data after cancellation?</h3>
    <p>Data is retained for 30 days after cancellation, then permanently deleted. You can export all data before cancelling.</p>

    <h3>Is there a free trial?</h3>
    <p>Yes — 7 days free on any paid plan, no credit card required.</p>

    <h3>Which payment methods are accepted?</h3>
    <p>Visa, Mastercard, American Express, and PayPal. All payments are secured via Stripe.</p>

    <h3>Is there an annual discount?</h3>
    <p>Yes — annual billing gives you 2 months free (saving ~17%).</p>
  </>
)

export const PricingPage: React.FC = () => (
  <LegalLayout he={heContent} en={enContent} lastUpdated="מרץ 2026 / March 2026" />
)
