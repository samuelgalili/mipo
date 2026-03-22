import React from 'react'
import { LegalLayout } from './legal/LegalLayout'

const heContent = (
  <>
    <h1>מדיניות ביטולים והחזרים</h1>
    <p>ב-MIPO אנו מאמינים בשקיפות מלאה. מדיניות זו מפרטת את זכויותיכם בכל הנוגע לביטול מנוי והחזר כספי.</p>

    <h2>1. ניסיון חינם</h2>
    <p>כל תוכנית בתשלום מגיעה עם <strong>7 ימי ניסיון בחינם</strong>, ללא צורך בכרטיס אשראי. ניתן לבטל בכל עת במהלך תקופת הניסיון ללא כל חיוב.</p>

    <h2>2. ביטול מנוי</h2>
    <p>ניתן לבטל את המנוי בכל עת מ-<strong>הגדרות החשבון ← מנוי ← ביטול</strong>.</p>
    <ul>
      <li>הביטול נכנס לתוקף <strong>בסוף תקופת החיוב הנוכחית</strong>.</li>
      <li>עד למועד הביטול תמשיכו ליהנות מכל פיצ'רי התוכנית ששילמתם עליה.</li>
      <li>לא יבוצע חיוב נוסף לאחר הביטול.</li>
    </ul>

    <h2>3. החזר כספי — 7 ימים</h2>
    <p>אם שילמתם על מנוי ואינם מרוצים — תוכלו לבקש <strong>החזר מלא תוך 7 ימים</strong> מיום הרכישה הראשונה, ללא שאלות מיותרות.</p>

    <h3>תנאי ההחזר:</h3>
    <ul>
      <li>הבקשה חייבת להגיע תוך 7 ימים מיום החיוב הראשון.</li>
      <li>מדיניות זו חלה על רכישה ראשונה בלבד — לא על חידושים.</li>
      <li>לא ניתן להחיל החזר לאחר ניצול מלא של תכונות Premium לאורך תקופה ממושכת.</li>
    </ul>

    <h3>לבקשת החזר:</h3>
    <p>שלחו אימייל ל-<a href="mailto:billing@mipo.pet">billing@mipo.pet</a> עם הנושא "בקשת החזר" ואימייל החשבון שלכם. נטפל בבקשה תוך 2 ימי עסקים.</p>

    <h2>4. חיובי חידוש</h2>
    <p>מנויים חודשיים ושנתיים מתחדשים אוטומטית. נשלח תזכורת באימייל <strong>3 ימים לפני</strong> כל חידוש. אם ביטלתם לאחר החיוב אך לפני שהשתמשתם בשירות באותו חודש — ניתן לבקש החזר לאותו חיוב.</p>

    <h2>5. מקרים מיוחדים</h2>
    <p>במקרים של תקלה טכנית חמורה שמנעה גישה לשירות למשך יותר מ-48 שעות רצופות — נציע זיכוי יחסי לחשבונכם.</p>

    <h2>6. לא ניתן להחזר</h2>
    <ul>
      <li>חיובים לאחר תקופת 7 הימים הראשונה</li>
      <li>חידושים אוטומטיים (אלא אם בוטלו בטרם עובדו)</li>
      <li>שימוש חלקי בתקופת חיוב</li>
    </ul>

    <h2>7. דין חל</h2>
    <p>בהתאם לחוק הגנת הצרכן הישראלי (תשמ"א-1981) והתקנות הנלוות, ייתכן שיחולו עליכם זכויות נוספות. מדיניות זו אינה גורעת מהן.</p>

    <h2>צרו קשר</h2>
    <p>לשאלות בנושא חיובים והחזרים: <a href="mailto:billing@mipo.pet">billing@mipo.pet</a><br />
    זמן תגובה: עד 2 ימי עסקים.</p>
  </>
)

const enContent = (
  <>
    <h1>Cancellation & Refund Policy</h1>
    <p>At MIPO we believe in full transparency. This policy details your rights regarding subscription cancellation and refunds.</p>

    <h2>1. Free Trial</h2>
    <p>Every paid plan comes with a <strong>7-day free trial</strong>, no credit card required. You can cancel at any time during the trial with no charge.</p>

    <h2>2. Cancelling Your Subscription</h2>
    <p>You can cancel your subscription at any time from <strong>Account Settings → Subscription → Cancel</strong>.</p>
    <ul>
      <li>Cancellation takes effect at the <strong>end of the current billing period</strong>.</li>
      <li>Until the cancellation date, you continue to enjoy all features of your plan.</li>
      <li>No further charges will be made after cancellation.</li>
    </ul>

    <h2>3. Money-Back Guarantee — 7 Days</h2>
    <p>If you paid for a subscription and are not satisfied — you may request a <strong>full refund within 7 days</strong> of your first purchase, no questions asked.</p>

    <h3>Refund conditions:</h3>
    <ul>
      <li>Request must be made within 7 days of the first charge.</li>
      <li>This policy applies to first-time purchases only — not renewals.</li>
      <li>Refunds are not available after extensive use of Premium features over a prolonged period.</li>
    </ul>

    <h3>To request a refund:</h3>
    <p>Email <a href="mailto:billing@mipo.pet">billing@mipo.pet</a> with subject "Refund Request" and your account email. We'll process within 2 business days.</p>

    <h2>4. Renewal Charges</h2>
    <p>Monthly and annual subscriptions renew automatically. We'll send a reminder email <strong>3 days before</strong> each renewal. If you cancel after being charged but before using the service that month, you may request a refund for that charge.</p>

    <h2>5. Special Circumstances</h2>
    <p>In the event of a severe technical failure that prevented access to the service for more than 48 consecutive hours, we will offer a proportional credit to your account.</p>

    <h2>6. Non-Refundable</h2>
    <ul>
      <li>Charges after the initial 7-day period</li>
      <li>Automatic renewals (unless cancelled before processing)</li>
      <li>Partial use of a billing period</li>
    </ul>

    <h2>7. Applicable Law</h2>
    <p>Under the Israeli Consumer Protection Law (1981) and related regulations, you may have additional rights. This policy does not diminish them.</p>

    <h2>Contact</h2>
    <p>For billing and refund questions: <a href="mailto:billing@mipo.pet">billing@mipo.pet</a><br />
    Response time: up to 2 business days.</p>
  </>
)

export const RefundPage: React.FC = () => (
  <LegalLayout he={heContent} en={enContent} lastUpdated="מרץ 2026 / March 2026" />
)
