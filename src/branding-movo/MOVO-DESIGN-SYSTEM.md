# Movo Design System

> Design system foundation for Movo — Mobility app for amateur athletes.  
> Direction: **"Warm Adult"** — Between Bend (minimal) and Duolingo (playful).

---

## Brand Identity

### Personality
- **Chaleureux** — Ton amical, pas corporate
- **Encourageant** — Célèbre les petites victoires sans être pushy
- **Accessible** — Simple, pas intimidant
- **Adulte** — Sérieux dans le craft, pas enfantin

### Ce qu'on n'est PAS
- ❌ Enfantin / Cartoon (pas de mascotte qui parle)
- ❌ Corporate / Froid (pas de "Bienvenue dans l'application")
- ❌ Médical / Clinique (pas de jargon santé)
- ❌ Fitness bro / Performance (pas de "CRUSH YOUR GOALS")

### Ton de voix
```
✅ "Salut Alex"
✅ "Prêt pour ta routine ?"
✅ "Continue !"
✅ "Bien joué !"
✅ "Ton corps te remercie."

❌ "Bienvenue, utilisateur"
❌ "DÉMARRER L'ENTRAÎNEMENT"
❌ "Tu n'as pas fait ta routine aujourd'hui"
❌ "Seulement 5 minutes pour transformer ton corps"
```

---

## Colors

### Light Mode (Default)

#### Backgrounds
| Token | Hex | Usage |
|-------|-----|-------|
| `background.primary` | `#FAF8F5` | Page background |
| `background.surface` | `#FFFFFF` | Cards, modals |
| `background.surfaceHover` | `#F5F3F0` | Hover states |
| `background.muted` | `#F0EDE8` | Disabled, progress bar bg |

#### Text
| Token | Hex | Usage |
|-------|-----|-------|
| `text.primary` | `#1A1A1A` | Headings, body text |
| `text.secondary` | `#6B6560` | Secondary info |
| `text.muted` | `#9A958E` | Placeholders, captions |

#### Accent
| Token | Hex | Usage |
|-------|-----|-------|
| `accent.default` | `#4A9D8E` | Buttons, links, active states |
| `accent.hover` | `#3D8577` | Hover states |
| `accent.soft` | `rgba(74, 157, 142, 0.10)` | Badges, soft backgrounds |
| `accent.medium` | `rgba(74, 157, 142, 0.20)` | Selected states |

#### Zone Colors
| Zone | Hex | Usage |
|------|-----|-------|
| Hanches | `#F2E0DC` | Hip exercises |
| Dos | `#DCE8E0` | Back exercises |
| Cou | `#E8E4D8` | Neck exercises |
| Épaules | `#DCE0E8` | Shoulder exercises |
| Chevilles | `#E4DCE8` | Ankle exercises |

#### Borders
| Token | Hex | Usage |
|-------|-----|-------|
| `border.default` | `#E8E4DE` | Card borders, dividers |
| `border.subtle` | `#F0EDE8` | Subtle separators |

### Dark Mode

#### Backgrounds
| Token | Hex |
|-------|-----|
| `background.primary` | `#1A1816` |
| `background.surface` | `#242220` |
| `background.surfaceHover` | `#2E2C2A` |
| `background.elevated` | `#302E2C` |

#### Text
| Token | Hex |
|-------|-----|
| `text.primary` | `#F5F2EE` |
| `text.secondary` | `#A8A299` |
| `text.muted` | `#6B665E` |

#### Accent
| Token | Hex |
|-------|-----|
| `accent.default` | `#5AB9A8` |
| `accent.hover` | `#6DCBB8` |

---

## Typography

### Font
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Scale

| Style | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display | 34px | 600 | 1.2 | Hero sections |
| H1 | 28px | 600 | 1.2 | Page titles |
| H2 | 22px | 600 | 1.3 | Card titles |
| H3 | 18px | 600 | 1.4 | Section titles |
| Body | 15px | 400 | 1.5 | Paragraphs |
| Body Small | 13px | 400 | 1.5 | Secondary text |
| Caption | 13px | 500 | 1.4 | Labels, metadata |
| Overline | 11px | 600 | 1.4 | Categories (uppercase) |
| Button | 16px | 500 | 1 | Button labels |

### Rules
- Maximum **2 text sizes per screen**
- Use `letter-spacing: -0.5px` for headings
- Use `letter-spacing: 0.5px` for overlines (uppercase text)

---

## Spacing

Base unit: **4px**

| Token | Value | Usage |
|-------|-------|-------|
| `spacing.1` | 4px | Tight gaps |
| `spacing.2` | 8px | Icon gaps, small padding |
| `spacing.3` | 12px | List gaps |
| `spacing.4` | 16px | Card padding (small) |
| `spacing.5` | 20px | Section gaps |
| `spacing.6` | 24px | Card padding (default) |
| `spacing.8` | 32px | Section margins |
| `spacing.10` | 40px | Large gaps |
| `spacing.12` | 48px | Page margins |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius.sm` | 8px | Small buttons, badges |
| `radius.md` | 12px | Inputs, secondary buttons |
| `radius.lg` | 16px | Primary buttons |
| `radius.xl` | 20px | Cards (small) |
| `radius.2xl` | 24px | Cards (default) |
| `radius.3xl` | 28px | Modals |
| `radius.full` | 9999px | Pills, avatars |

---

## Shadows

### Light Mode
```css
--shadow-sm: 0 1px 2px rgba(26, 26, 26, 0.04);
--shadow-md: 0 2px 8px rgba(26, 26, 26, 0.04);
--shadow-lg: 0 4px 16px rgba(26, 26, 26, 0.06);
--shadow-xl: 0 8px 32px rgba(26, 26, 26, 0.08);
```

### Dark Mode
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.25);
--shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.3);
--shadow-xl: 0 8px 32px rgba(0, 0, 0, 0.4);
```

---

## Motion

### Duration
| Token | Value | Usage |
|-------|-------|-------|
| `duration.fast` | 150ms | Micro-interactions (hover, focus) |
| `duration.normal` | 250ms | State changes |
| `duration.slow` | 350ms | Enter/exit animations |
| `duration.slower` | 500ms | Page transitions |

### Easing
```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* For celebrations */
```

---

## Components

### Button Primary
```css
min-height: 52px;
padding: 16px 24px;
border-radius: 16px;
font-size: 16px;
font-weight: 500;
background: var(--accent-default);
color: white;
```

### Button Secondary
```css
min-height: 44px;
padding: 12px 20px;
border-radius: 12px;
font-size: 15px;
font-weight: 500;
background: var(--accent-soft);
color: var(--accent-default);
```

### Card
```css
padding: 24px;
border-radius: 24px;
background: var(--background-surface);
box-shadow: var(--shadow-lg);
```

### Badge (Streak)
```css
padding: 10px 14px;
border-radius: 18px;
background: var(--accent-soft);
font-size: 16px;
font-weight: 600;
color: var(--accent-default);
```

### Progress Bar
```css
height: 6px;
border-radius: 3px;
background: var(--background-muted);

/* Fill */
background: var(--accent-default);
transition: width 400ms var(--ease-default);
```

### Organic Blob (Exercise container)
```css
/* Use one of these border-radius values for organic shapes */
border-radius: 58% 42% 55% 45% / 45% 55% 45% 55%;
border-radius: 45% 55% 48% 52% / 52% 48% 50% 50%;
border-radius: 52% 48% 45% 55% / 48% 52% 55% 45%;
```

---

## Illustrations

### Style
- **Flat**, geometric, silhouette-based
- **No detailed faces** — keep figures abstract
- **Stroke width**: 2.5px for line art
- **Colors**: Zone colors or `text.muted` for silhouettes

### Exercise Figures
```
- Show poses clearly
- Suggest movement through position, not exaggerated dynamics
- Use organic blob shapes as containers
- Opacity 0.35 for silhouettes inside blobs
```

### Celebration Illustrations
```
- Simple geometric confetti (small rectangles, rotated)
- Person with arms up (flat style, not cartoon)
- Use accent color + zone colors for confetti
- Keep it subtle — not Duolingo-level party
```

---

## Streak Icon

### Water Drop
- Style: Filled with gradient
- Gradient (light): `#5AB9A8` → `#3D8577`
- Gradient (dark): `#6DCBB8` → `#4A9D8E`
- Highlight: White ellipse (30% opacity) top-left

```svg
<svg width="24" height="24" viewBox="0 0 24 24">
  <defs>
    <linearGradient id="streakGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#5AB9A8"/>
      <stop offset="100%" stop-color="#3D8577"/>
    </linearGradient>
  </defs>
  <path 
    d="M12 2C12 2 5 10 5 15C5 19 8 22 12 22C16 22 19 19 19 15C19 10 12 2 12 2Z"
    fill="url(#streakGrad)"
  />
  <ellipse cx="8.5" cy="14" rx="1.5" ry="2" fill="rgba(255,255,255,0.3)"/>
</svg>
```

---

## Icons

### Recommended Libraries
- **Lucide** (primary)
- **Phosphor Icons** (Light weight)

### Style
- Outlined, not filled
- Stroke width: 2px
- Sizes: 16px (sm), 20px (md), 24px (lg), 32px (xl)

---

## Do's and Don'ts

### ✅ Do
- Use warm, encouraging language
- Celebrate completions with subtle illustrations
- Keep interfaces simple — max 2-3 actions per screen
- Use organic blob shapes for exercise containers
- Maintain generous white space
- Test both light and dark modes

### ❌ Don't
- Use mascots that talk or have expressions
- Use emojis in the interface
- Use aggressive/fitness bro language
- Use pure black (#000000) in light mode
- Add more than 2 text hierarchy levels per section
- Use heavy drop shadows

---

## File Structure Recommendation

```
/design-system
  /tokens
    colors.json
    typography.json
    spacing.json
    motion.json
  /components
    Button.tsx
    Card.tsx
    Badge.tsx
    ProgressBar.tsx
    Blob.tsx
  /illustrations
    PersonSeated.svg
    PersonStanding.svg
    PersonStretch.svg
    CelebrationPerson.svg
    StreakDrop.svg
  /styles
    variables.css
    globals.css
```

---

## Quick Reference

```css
/* Core colors */
--bg: #FAF8F5;
--surface: #FFFFFF;
--text: #1A1A1A;
--text-secondary: #6B6560;
--accent: #4A9D8E;
--accent-soft: rgba(74, 157, 142, 0.10);
--border: #E8E4DE;

/* Typography */
--font: 'Inter', sans-serif;
--h1: 28px/1.2 600;
--body: 15px/1.5 400;

/* Spacing */
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;

/* Radius */
--radius-button: 16px;
--radius-card: 24px;

/* Motion */
--duration: 250ms;
--ease: cubic-bezier(0.4, 0, 0.2, 1);
```
