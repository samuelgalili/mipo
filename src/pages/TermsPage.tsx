import React from 'react'
import { LegalLayout } from './legal/LegalLayout'

const heContent = (
  <>
    <h1>תנאי שימוש</h1>
    <p>ברוכים הבאים ל-MIPO. השימוש בפלטפורמה שלנו מהווה הסכמה לתנאים הבאים. אנא קראו אותם בעיון.</p>

    <h2>1. הגדרות</h2>
    <p><strong>"MIPO"</strong> — פלטפורמת ניהול חיות מחמד המופעלת על ידי MIPO Ltd.<br />
    <strong>"משתמש"</strong> — כל אדם שנרשם לשירות ומשתמש בו.<br />
    <strong>"שירות"</strong> — כלל הפיצ'רים, הכלים והתכנים הזמינים דרך mipo.pet.</p>

    <h2>2. קבלת התנאים</h2>
    <p>על ידי יצירת חשבון או שימוש בשירות, אתם מאשרים כי קראתם, הבנתם ומסכימים לתנאי שימוש אלו. אם אינכם מסכימים — אנא אל תשתמשו בשירות.</p>

    <h2>3. גיל מינימלי</h2>
    <p>השירות מיועד למשתמשים מגיל 13 ומעלה. משתמשים מתחת לגיל 18 נדרשים לאישור הורה או אפוטרופוס חוקי.</p>

    <h2>4. חשבון משתמש</h2>
    <ul>
      <li>אתם אחראים לשמירת סודיות פרטי הכניסה לחשבונכם.</li>
      <li>יש להגדיר סיסמה חזקה ולא לחלוק גישה עם אחרים.</li>
      <li>כל פעילות שנעשית תחת חשבונכם היא באחריותכם הבלעדית.</li>
      <li>יש להודיע לנו מיד על כל חשד לגישה בלתי מורשית.</li>
    </ul>

    <h2>5. שימוש מותר</h2>
    <p>מותר להשתמש בשירות לצרכים אישיים, לא-מסחריים, לניהול מידע על חיות המחמד שלכם.</p>
    <p>אסור בהחלט:</p>
    <ul>
      <li>להשתמש בשירות לפעילות בלתי חוקית</li>
      <li>לנסות לפרוץ, לשבש או לפגוע במערכות MIPO</li>
      <li>לפרסם תוכן פוגעני, מטעה או בלתי חוקי</li>
      <li>לאסוף נתונים על משתמשים אחרים ללא הרשאה</li>
      <li>להשתמש בבוטים, scrapers או כלי אוטומציה ללא אישור בכתב</li>
    </ul>

    <h2>6. תוכן משתמש</h2>
    <p>אתם שומרים על בעלות על התוכן שאתם מעלים. על ידי העלאת תוכן, אתם מעניקים ל-MIPO רישיון מוגבל לאחסן ולהציג אותו לצורך מתן השירות בלבד.</p>

    <h2>7. קניין רוחני</h2>
    <p>כל זכויות הקניין הרוחני של MIPO — לרבות עיצוב, קוד, לוגו, תוכן ומותג — שייכות ל-MIPO Ltd. אין להעתיק, להפיץ או לשנות ללא אישור מפורש בכתב.</p>

    <h2>8. שירות ה-AI</h2>
    <p>Mipo הוא סוכן AI לצורכי ליווי ועזרה כללית. התוכן שמספק אינו מהווה ייעוץ וטרינרי מקצועי ואינו מחליף אבחון של רופא וטרינר. לכל בעיה רפואית — פנו לוטרינר מורשה.</p>

    <h2>9. זמינות השירות</h2>
    <p>אנו שואפים לזמינות של 99.5%. עם זאת, MIPO אינה אחראית לנזקים הנגרמים מהפסקות שירות, תקלות טכניות או אובדן נתונים.</p>

    <h2>10. סיום שירות</h2>
    <p>MIPO שומרת לעצמה את הזכות להשעות או לסיים חשבון שמפר את התנאים, ללא התראה מוקדמת.</p>

    <h2>11. שינויים בתנאים</h2>
    <p>נוכל לעדכן תנאים אלו מעת לעת. המשך השימוש בשירות לאחר עדכון מהווה הסכמה לתנאים החדשים.</p>

    <h2>12. דין חל וסמכות שיפוט</h2>
    <p>תנאים אלו כפופים לדין הישראלי. כל סכסוך יידון בבתי המשפט המוסמכים בתל אביב-יפו.</p>

    <h2>יצירת קשר</h2>
    <p>לשאלות בנוגע לתנאי השימוש: <a href="mailto:legal@mipo.pet">legal@mipo.pet</a></p>
  </>
)

const enContent = (
  <>
    <h1>Terms of Service</h1>
    <p>Welcome to MIPO. By using our platform, you agree to the following terms. Please read them carefully.</p>

    <h2>1. Definitions</h2>
    <p><strong>"MIPO"</strong> — Pet management platform operated by MIPO Ltd.<br />
    <strong>"User"</strong> — Any person who registers for and uses the service.<br />
    <strong>"Service"</strong> — All features, tools, and content available through mipo.pet.</p>

    <h2>2. Acceptance of Terms</h2>
    <p>By creating an account or using the service, you confirm that you have read, understood, and agree to these Terms of Service. If you do not agree, please do not use the service.</p>

    <h2>3. Minimum Age</h2>
    <p>The service is intended for users aged 13 and above. Users under 18 require parental or legal guardian consent.</p>

    <h2>4. User Account</h2>
    <ul>
      <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
      <li>Use a strong password and do not share access with others.</li>
      <li>All activity under your account is your sole responsibility.</li>
      <li>Notify us immediately of any suspected unauthorized access.</li>
    </ul>

    <h2>5. Permitted Use</h2>
    <p>You may use the service for personal, non-commercial purposes to manage information about your pets.</p>
    <p>The following are strictly prohibited:</p>
    <ul>
      <li>Using the service for illegal activities</li>
      <li>Attempting to hack, disrupt, or damage MIPO systems</li>
      <li>Posting harmful, misleading, or illegal content</li>
      <li>Collecting data about other users without authorization</li>
      <li>Using bots, scrapers, or automation tools without written consent</li>
    </ul>

    <h2>6. User Content</h2>
    <p>You retain ownership of content you upload. By uploading content, you grant MIPO a limited license to store and display it solely for providing the service.</p>

    <h2>7. Intellectual Property</h2>
    <p>All MIPO intellectual property — including design, code, logo, content, and brand — belongs to MIPO Ltd. Copying, distributing, or modifying without explicit written permission is prohibited.</p>

    <h2>8. AI Service</h2>
    <p>Mipo is an AI agent for general companionship and assistance. Content provided does not constitute professional veterinary advice and does not replace diagnosis by a licensed veterinarian. For any medical concern, consult a licensed vet.</p>

    <h2>9. Service Availability</h2>
    <p>We strive for 99.5% uptime. However, MIPO is not liable for damages caused by service interruptions, technical failures, or data loss.</p>

    <h2>10. Termination</h2>
    <p>MIPO reserves the right to suspend or terminate an account that violates these terms, without prior notice.</p>

    <h2>11. Changes to Terms</h2>
    <p>We may update these terms periodically. Continued use of the service after an update constitutes acceptance of the new terms.</p>

    <h2>12. Governing Law & Jurisdiction</h2>
    <p>These terms are governed by Israeli law. Any dispute shall be resolved in the competent courts of Tel Aviv-Jaffa.</p>

    <h2>Contact</h2>
    <p>For questions regarding these terms: <a href="mailto:legal@mipo.pet">legal@mipo.pet</a></p>
  </>
)

export const TermsPage: React.FC = () => (
  <LegalLayout he={heContent} en={enContent} lastUpdated="מרץ 2026 / March 2026" />
)
