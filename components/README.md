# 🐾 MIPO Design System

קומפוננטים בסיסיים לפלטפורמת MIPO — Aurora Purple Theme + Tailwind CSS.

## קומפוננטים

| קומפוננט | תיאור |
|---|---|
| `MipoButton` | כפתור עם 4 variants, loading state, sizes |
| `MipoCard` | כרטיס עם title/subtitle/footer + hover |
| `MipoInput` | שדה קלט עם label, error, hint, icon |
| `MipoBadge` | תגית צבעונית עם dot indicator |
| `MipoAvatar` | אווטאר משתמש/חיית מחמד עם online status |
| `MipoModal` | מודאל עם backdrop blur + keyboard close |
| `MipoToast` | מערכת הודעות toast (provider + hook) |
| `MipoLoader` | ספינר טעינה, תומך fullScreen |
| `MipoDivider` | מפריד עם אופציית label |

## שימוש

```jsx
import { MipoButton, MipoCard, MipoBadge } from './components';

// כפתור ראשי
<MipoButton label="🐾 הצטרף" onClick={handleClick} />

// כרטיס
<MipoCard title="שם חיית המחמד" subtitle="כלב, 3 שנים">
  <p>תוכן...</p>
</MipoCard>

// תגית
<MipoBadge label="פעיל" variant="green" dot />
```

## Toast

```jsx
// עטוף את האפליקציה
<MipoToastProvider>
  <App />
</MipoToastProvider>

// בתוך קומפוננט
const toast = useToast();
toast({ message: "נשמר בהצלחה! 🐾", type: "success" });
```

## טוקנים (Tailwind)

- **Primary gradient:** `from-purple-500 via-violet-500 to-fuchsia-500`
- **Ring:** `ring-purple-200`
- **Border:** `border-purple-100`
- **Shadow:** `shadow-purple-100/40`
