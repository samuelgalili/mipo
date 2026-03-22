import React from 'react'
import { LegalLayout } from './legal/LegalLayout'

const heContent = (
  <>
    <h1>מדיניות פרטיות</h1>
    <p>ב-MIPO אנו מתייחסים לפרטיות שלכם ברצינות. מסמך זה מסביר אילו נתונים אנו אוספים, כיצד אנו משתמשים בהם ואיזו שליטה יש לכם עליהם.</p>

    <h2>1. מי אחראי על הנתונים?</h2>
    <p>MIPO Ltd, הפועלת דרך mipo.pet, היא הגוף האחראי (Data Controller) על עיבוד הנתונים האישיים של המשתמשים.</p>
    <p>לפניות: <a href="mailto:privacy@mipo.pet">privacy@mipo.pet</a></p>

    <h2>2. אילו נתונים אנו אוספים?</h2>

    <h3>נתונים שאתם מספקים ישירות:</h3>
    <ul>
      <li>שם ואימייל בעת הרשמה</li>
      <li>מידע על חיית המחמד — שם, גיל, גזע, סוג</li>
      <li>תוכן שיחות עם Mipo AI</li>
      <li>נתוני בריאות ורשומות וטרינריות שהזנתם</li>
    </ul>

    <h3>נתונים שנאספים אוטומטית:</h3>
    <ul>
      <li>כתובת IP וסוג דפדפן</li>
      <li>זמני כניסה ופעולות בפלטפורמה (logs)</li>
      <li>נתוני שימוש כלליים לצורך שיפור השירות</li>
    </ul>

    <h2>3. כיצד אנו משתמשים בנתונים?</h2>
    <ul>
      <li><strong>מתן השירות</strong> — הפעלת פרופיל החיה, שיחות AI, תזכורות</li>
      <li><strong>שיפור המוצר</strong> — ניתוח דפוסי שימוש אנונימיים</li>
      <li><strong>תמיכה טכנית</strong> — מענה לבעיות ושאלות</li>
      <li><strong>אבטחה</strong> — זיהוי ומניעת שימוש לרעה</li>
      <li><strong>תקשורת</strong> — עדכונים מהותיים על השירות (ניתן לבטל)</li>
    </ul>

    <h2>4. שיתוף נתונים עם צדדים שלישיים</h2>
    <p>אנו <strong>לא מוכרים</strong> נתונים אישיים. אנו משתפים נתונים רק עם:</p>
    <ul>
      <li><strong>Supabase</strong> — תשתית בסיס נתונים ואימות (ארה"ב, EU SCC)</li>
      <li><strong>Anthropic</strong> — עיבוד שיחות AI (ארה"ב, הסכם עיבוד נתונים)</li>
      <li><strong>Google Cloud</strong> — תשתית שרת backend (אירופה)</li>
      <li><strong>Stripe</strong> — עיבוד תשלומים (PCI DSS)</li>
    </ul>
    <p>כל הספקים חתומים על הסכמי עיבוד נתונים מחייבים.</p>

    <h2>5. אחסון ואבטחה</h2>
    <p>הנתונים מאוחסנים בשרתים מאובטחים באירופה. אנו משתמשים ב-HTTPS מוצפן, בקרות גישה מחמירות והצפנה במנוחה. עם זאת, אין הבטחה מוחלטת לאבטחת מידע.</p>

    <h2>6. שמירת נתונים</h2>
    <ul>
      <li>נתוני חשבון — לכל משך השימוש בשירות ועד 30 יום לאחר מחיקת החשבון</li>
      <li>לוגים טכניים — עד 90 יום</li>
      <li>נתונים לצורך עמידה בדרישות חוקיות — עד 7 שנים</li>
    </ul>

    <h2>7. הזכויות שלכם</h2>
    <p>בהתאם לחוק הגנת הפרטיות הישראלי ו-GDPR (למשתמשים ב-EU), יש לכם זכות:</p>
    <ul>
      <li><strong>גישה</strong> — לקבל עותק של הנתונים שלכם</li>
      <li><strong>תיקון</strong> — לתקן נתונים שגויים</li>
      <li><strong>מחיקה</strong> — לבקש מחיקת חשבון וכל הנתונים</li>
      <li><strong>הגבלה</strong> — להגביל עיבוד מסוים</li>
      <li><strong>ניידות</strong> — לקבל את הנתונים בפורמט נייד (JSON/CSV)</li>
      <li><strong>התנגדות</strong> — להתנגד לעיבוד לצורכי שיווק</li>
    </ul>
    <p>לממש את זכויותיכם: <a href="mailto:privacy@mipo.pet">privacy@mipo.pet</a></p>

    <h2>8. עוגיות (Cookies)</h2>
    <p>אנו משתמשים בעוגיות חיוניות בלבד לצורך ניהול הסשן ואימות. אין עוגיות פרסום או מעקב של צד שלישי.</p>

    <h2>9. ילדים</h2>
    <p>השירות אינו מיועד לילדים מתחת לגיל 13. אם נודע לנו שנאספו נתונים של קטין ללא הסכמה — נמחק אותם לאלתר.</p>

    <h2>10. שינויים במדיניות</h2>
    <p>שינויים מהותיים יובאו לידיעתכם באימייל לפחות 14 יום מראש.</p>
  </>
)

const enContent = (
  <>
    <h1>Privacy Policy</h1>
    <p>At MIPO we take your privacy seriously. This document explains what data we collect, how we use it, and what control you have over it.</p>

    <h2>1. Who is responsible for your data?</h2>
    <p>MIPO Ltd, operating through mipo.pet, is the Data Controller for user personal data.</p>
    <p>Contact: <a href="mailto:privacy@mipo.pet">privacy@mipo.pet</a></p>

    <h2>2. What data do we collect?</h2>

    <h3>Data you provide directly:</h3>
    <ul>
      <li>Name and email upon registration</li>
      <li>Pet information — name, age, breed, type</li>
      <li>Chat content with Mipo AI</li>
      <li>Health data and veterinary records you enter</li>
    </ul>

    <h3>Automatically collected data:</h3>
    <ul>
      <li>IP address and browser type</li>
      <li>Login times and platform activity (logs)</li>
      <li>General usage data for service improvement</li>
    </ul>

    <h2>3. How do we use your data?</h2>
    <ul>
      <li><strong>Service delivery</strong> — pet profile, AI chats, reminders</li>
      <li><strong>Product improvement</strong> — anonymous usage pattern analysis</li>
      <li><strong>Technical support</strong> — addressing issues and questions</li>
      <li><strong>Security</strong> — detecting and preventing abuse</li>
      <li><strong>Communication</strong> — essential service updates (opt-out available)</li>
    </ul>

    <h2>4. Sharing with third parties</h2>
    <p>We <strong>do not sell</strong> personal data. We share data only with:</p>
    <ul>
      <li><strong>Supabase</strong> — database & auth infrastructure (US, EU SCC)</li>
      <li><strong>Anthropic</strong> — AI chat processing (US, DPA in place)</li>
      <li><strong>Google Cloud</strong> — backend server infrastructure (Europe)</li>
      <li><strong>Stripe</strong> — payment processing (PCI DSS)</li>
    </ul>
    <p>All providers have signed binding data processing agreements.</p>

    <h2>5. Storage & Security</h2>
    <p>Data is stored on secured servers in Europe. We use HTTPS encryption, strict access controls, and encryption at rest. However, no absolute security guarantee can be made.</p>

    <h2>6. Data Retention</h2>
    <ul>
      <li>Account data — for the duration of service use and 30 days after account deletion</li>
      <li>Technical logs — up to 90 days</li>
      <li>Legally required data — up to 7 years</li>
    </ul>

    <h2>7. Your Rights</h2>
    <p>Under Israeli Privacy Protection Law and GDPR (for EU users), you have the right to:</p>
    <ul>
      <li><strong>Access</strong> — receive a copy of your data</li>
      <li><strong>Rectification</strong> — correct inaccurate data</li>
      <li><strong>Erasure</strong> — request account and all data deletion</li>
      <li><strong>Restriction</strong> — limit certain processing</li>
      <li><strong>Portability</strong> — receive your data in a portable format (JSON/CSV)</li>
      <li><strong>Objection</strong> — object to processing for marketing purposes</li>
    </ul>
    <p>To exercise your rights: <a href="mailto:privacy@mipo.pet">privacy@mipo.pet</a></p>

    <h2>8. Cookies</h2>
    <p>We use only essential cookies for session management and authentication. No advertising or third-party tracking cookies are used.</p>

    <h2>9. Children</h2>
    <p>The service is not intended for children under 13. If we become aware that data from a minor has been collected without consent, we will delete it immediately.</p>

    <h2>10. Policy Changes</h2>
    <p>Material changes will be communicated via email at least 14 days in advance.</p>
  </>
)

export const PrivacyPage: React.FC = () => (
  <LegalLayout he={heContent} en={enContent} lastUpdated="מרץ 2026 / March 2026" />
)
