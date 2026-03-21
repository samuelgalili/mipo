# CONTEXT.md — MIPO Project Decisions

## זהות הפרויקט
- **שם:** MIPO
- **דומיין:** mipo.pet
- **תיאור:** פלטפורמה לחיות מחמד — כלב, חתול, ארנב, תוכי ועוד

## Stack טכני
| שכבה | טכנולוגיה |
|------|-----------|
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS |
| DB / Auth | Supabase |
| Deploy | Vercel |
| VPS | Contabo — `207.180.204.110` |
| Domain | Namecheap → mipo.pet |

## עיצוב
- **רקע:** לבן (`#FFFFFF`)
- **צבע ראשי:** Aurora סגול `#7C3AED`
- **Gradient:** `from-purple-500 via-violet-500 to-fuchsia-500`
- **פונט:** DM Serif Display (Google Fonts)
- **סגנון:** רקע לבן + aurora blobs מטושטשים, border-radius גבוה

## לוגו
- האות **M** — stroke עם קשתות, ללא מילוי
- **נקודה** מתחתית האות
- **Gradient:** טרקוטה `#C47B5A` → סגול `#9B6BAE` → כחול `#4A90C4`
- קובץ: `src/pages/ComingSoonPage.tsx` (SVG inline)

## Supabase
- **URL:** `https://wfjjcqzlaqdslifkgayw.supabase.co`
- **טבלאות קיימות:**
  - `onboarding` — `id, created_at, user_id, owner_name, owner_email, pet_type, pet_name, pet_age, pet_breed`
- **Auth:** email + password (Supabase Auth)

## פיצרים מתוכננים
| פיצר | תיאור |
|------|-------|
| Onboarding | 3 שלבים — פרטי בעלים, סוג חיה, פרטי חיה |
| Dog Companion | ליווי יומיומי לכלב |
| Parallel Life | "חיים מקבילים" — פרספקטיבת החיה |
| AI Chat | שיחה עם agent בשם Mipo |
| חנות | מוצרים לחיות מחמד |
| פיד | תוכן ועדכונים |

## OpenClaw / AI
- **Agent:** Mipo
- **ערוץ:** WhatsApp
- **סוכני AI מתוכננים:** 22
- פלטפורמה: OpenClaw — מחובר ל-WhatsApp

## מצב נוכחי
- ✅ Design System — Button, Input, Card, Avatar, Badge (TSX + RTL)
- ✅ Onboarding — 3 שלבים + Supabase
- ✅ Auth — הרשמה / התחברות
- ✅ Dashboard — מסך בית בסיסי
- ✅ Coming Soon — חי על mipo.pet
- ✅ GitHub — github.com/samuelgalili/mipo
- ⬜ פרופיל חיה
- ⬜ AI Chat
- ⬜ פיד
- ⬜ חנות
