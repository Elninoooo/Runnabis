# Guide de mise en place d'un Design System React Native

Ce guide documente l'approche utilisée pour Runnabis et peut être répliqué sur d'autres projets React Native.

---

## Table des matières

1. [Input requis](#1-input-requis)
2. [Output à générer](#2-output-à-générer)
3. [Fichier CLAUDE.md](#3-fichier-claudemd)
4. [Erreurs à éviter](#4-erreurs-à-éviter)
5. [Bonnes pratiques](#5-bonnes-pratiques)
6. [Workflow recommandé](#6-workflow-recommandé)
7. [Checklist](#7-checklist)

---

## 1. Input requis

### A. Brand Guidelines Document

Fournis un document décrivant :

```markdown
## Direction Créative
- Positionnement : [ex: "Warm Adult" - entre minimaliste et playful]
- Ton de voix : [tutoiement/vouvoiement, formel/informel]
- Personnalité : [4-5 adjectifs clés]
- Références : [apps à imiter / à éviter]

## Règles Visuelles
- INTERDIT : [ex: emojis, MAJUSCULES agressives, ton corporate]
- ENCOURAGÉ : [ex: icônes outlined, illustrations flat, ton chaleureux]

## Palette de Couleurs

### Light Mode
- Background primary : #FFFFFF
- Background secondary : #F5F5F5
- Background surface : #FFFFFF
- Background muted : #F0F0F0
- Text primary : #1A1A1A
- Text secondary : #666666
- Text muted : #999999
- Accent : #0D9488 (ou ta couleur principale)
- Accent soft : #CCFBF1
- Success : #22C55E
- Error : #EF4444
- Warning : #F59E0B

### Dark Mode
- [Mêmes catégories avec couleurs adaptées]

## Typographie
- Font family : System (ou custom)
- Tailles : xs(12), sm(14), base(16), md(16), lg(18), xl(20), 2xl(24), 3xl(30), 4xl(36)
- Weights : normal(400), medium(500), semibold(600), bold(700)
- Line heights : tight(1.25), normal(1.5), relaxed(1.75)

## Spacing
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

## Border Radius
- sm: 4px
- md: 8px
- lg: 12px
- xl: 16px
- full: 9999px
```

### B. Liste des composants UI requis

```markdown
## Composants de Base
- [ ] Button (primary, secondary, ghost)
- [ ] Card (elevated, outlined, filled)
- [ ] Input / TextInput
- [ ] Checkbox
- [ ] Switch

## Composants de Sélection
- [ ] SelectCard (choix type onboarding)
- [ ] ListItem (listes type settings)

## Composants de Navigation
- [ ] IconButton (boutons icône seule)
- [ ] ScreenHeader (header avec back + titre)
- [ ] TabBar (si navigation tabs)

## Composants Métier
- [ ] [Spécifiques à ton app]
```

### C. Liste des écrans

```markdown
- [ ] Onboarding (X étapes)
- [ ] Home
- [ ] Detail
- [ ] Settings
- [ ] Profile
- [ ] etc.
```

---

## 2. Output à générer

### Structure de fichiers

```
src/
├── design-system/
│   ├── index.ts              # Export principal
│   ├── theme.ts              # Tokens (colors, typography, spacing)
│   ├── ThemeProvider.tsx     # Context React pour le thème
│   └── useTheme.ts           # Hook pour accéder au thème
│
├── components/
│   ├── index.ts              # Export tous les composants
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── IconButton.tsx
│   ├── ListItem.tsx
│   ├── ScreenHeader.tsx
│   ├── SelectCard.tsx
│   └── illustrations/        # SVG/illustrations custom
│       ├── index.ts
│       └── [Illustration].tsx
│
├── screens/
│   └── [Screen].tsx
│
├── stories/                  # Storybook
│   ├── Introduction.stories.tsx
│   ├── Guidelines.stories.tsx
│   ├── Colors.stories.tsx
│   ├── Typography.stories.tsx
│   └── [Component].stories.tsx
│
└── .storybook/               # Config Storybook web
    ├── main.ts
    └── preview.tsx
```

### Fichiers clés à générer

#### design-system/theme.ts

```typescript
export const colors = {
  background: {
    primary: '#FFFBF5',
    secondary: '#FBF8F3',
    surface: '#FFFFFF',
    surfaceHover: '#F5F5F5',
    elevated: '#FFFFFF',
    muted: '#F5F0E8',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    muted: '#999999',
    inverse: '#FFFFFF',
  },
  accent: {
    default: '#0D9488',
    soft: '#CCFBF1',
    hover: '#0F766E',
  },
  semantic: {
    success: '#22C55E',
    successSoft: '#DCFCE7',
    error: '#EF4444',
    errorSoft: '#FEE2E2',
    warning: '#F59E0B',
    warningSoft: '#FEF3C7',
  },
  border: {
    default: '#E5E5E5',
    subtle: '#F0F0F0',
  },
};

export const darkColors = {
  // ... version dark mode
};

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};
```

#### design-system/ThemeProvider.tsx

```typescript
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { colors, darkColors, typography, spacing, borderRadius } from './theme';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  const value: ThemeContextType = {
    mode,
    setMode,
    colors: mode === 'light' ? colors : darkColors,
    typography,
    spacing,
    borderRadius,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

---

## 3. Fichier CLAUDE.md

Ajoute ce contenu dans ton fichier `.claude/settings.md` ou `CLAUDE.md` :

```markdown
# Design System Guidelines

## Direction Créative
[Copier ta direction créative ici]

## Règles Absolues
- JAMAIS d'emojis dans l'interface utilisateur
- TOUJOURS utiliser les composants du design system
- TOUJOURS utiliser useTheme() pour accéder aux tokens
- JAMAIS de couleurs/tailles hardcodées (#xxx ou nombres directs)
- TOUJOURS tester le dark mode

## Icônes
- Bibliothèque : lucide-react-native
- Style : Outlined (jamais filled)
- Stroke width : 2px
- Tailles standards :
  - 16px : small (sm)
  - 20px : medium (md) - défaut
  - 24px : large (lg)
  - 32px : extra large (xl)

## Composants Disponibles

### Button
```tsx
<Button
  label="Texte du bouton"
  onPress={handlePress}
  variant="primary" // primary | secondary | ghost
  size="md"         // sm | md | lg
  fullWidth={false}
  disabled={false}
/>
```

### Card
```tsx
<Card
  variant="elevated" // elevated | outlined | filled
  padding="md"       // none | sm | md | lg
>
  {children}
</Card>
```

### IconButton
```tsx
import { Settings } from 'lucide-react-native';

<IconButton
  icon={<Settings size={20} color={colors.text.secondary} strokeWidth={2} />}
  onPress={handlePress}
  variant="ghost" // default | ghost | muted
  size="md"       // sm | md | lg
  disabled={false}
/>
```

### ListItem
```tsx
// Type navigation (avec chevron)
<ListItem
  type="navigation"
  icon={<User size={20} color={colors.text.secondary} strokeWidth={2} />}
  title="Mon profil"
  description="Description optionnelle"
  onPress={handlePress}
  showBorder={true}
/>

// Type toggle (avec switch)
<ListItem
  type="toggle"
  icon={<Moon size={20} color={colors.text.secondary} strokeWidth={2} />}
  title="Mode sombre"
  description="Activé"
  value={isDark}
  onValueChange={setIsDark}
/>

// Type info (affiche une valeur)
<ListItem
  type="info"
  icon={<Target size={20} color={colors.text.secondary} strokeWidth={2} />}
  title="Objectif"
  value="Semi-marathon"
/>
```

### ScreenHeader
```tsx
<ScreenHeader
  title="Titre de l'écran"
  onBack={handleBack}        // optionnel, affiche bouton retour
  rightAction={<IconButton />} // optionnel
  showBorder={false}
/>
```

### SelectCard
```tsx
import { Medal } from 'lucide-react-native';

<SelectCard
  icon={<Medal size={24} color={colors.accent.default} strokeWidth={2} />}
  title="Semi-marathon"
  description="21,1 km"
  selected={true}
  onPress={handleSelect}
/>
```

## Patterns de Code

### Accéder au thème
```tsx
const { colors, typography, spacing, borderRadius, mode, setMode } = useTheme();
```

### Style inline avec tokens
```tsx
<View style={[
  styles.container,
  {
    backgroundColor: colors.background.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
  }
]}>
```

### Icône avec couleur du thème
```tsx
import { Settings } from 'lucide-react-native';
const { colors } = useTheme();

<Settings
  size={20}
  color={colors.text.secondary}
  strokeWidth={2}
/>
```

### Texte avec typographie
```tsx
<Text style={{
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.text.primary,
  lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
}}>
```

## Convention de Nommage des Props

| Concept | Nom de prop |
|---------|-------------|
| Texte principal | `title` |
| Texte secondaire | `description` |
| Action au clic | `onPress` |
| Changement de valeur | `onValueChange` |
| Séparateur visuel | `showBorder` |
| État sélectionné | `selected` |
| État désactivé | `disabled` |
| Valeur affichée | `value` |
| Icône | `icon` |
| Variante de style | `variant` |
| Taille | `size` |

## Storybook

### Structure d'une story
```tsx
/**
 * # ComponentName
 *
 * Description courte du composant.
 * **Supporte le Dark Mode** - utilise le sélecteur de background dans la toolbar.
 *
 * ## Utilisation
 * - Cas d'usage 1
 * - Cas d'usage 2
 *
 * ## Variantes
 * - `variant1` : Description
 * - `variant2` : Description
 *
 * ## Props
 * - `prop1` : Description
 * - `prop2` : Description
 *
 * ## Tokens utilisés
 * - `colors.xxx` : Pour quoi
 * - `spacing.xxx` : Pour quoi
 */
const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  // ...
};
```

### Règles Storybook
- Chaque composant DOIT avoir une story
- Les stories DOIVENT documenter toutes les variantes
- Les stories DOIVENT supporter le dark mode
- Utiliser `function Render()` pour les stories avec hooks

## Erreurs à Éviter

1. ❌ Utiliser des emojis → ✅ Utiliser Lucide icons
2. ❌ Hardcoder les couleurs (#xxx) → ✅ Utiliser colors.xxx
3. ❌ Hardcoder les tailles (16) → ✅ Utiliser spacing.md
4. ❌ Créer des composants ad-hoc → ✅ Systématiser dans /components
5. ❌ Oublier le dark mode → ✅ Toujours tester les deux modes
6. ❌ Mélanger Storybook mobile et web → ✅ Utiliser uniquement web
```

---

## 4. Erreurs à éviter

### Erreur 1 : Storybook Mobile + Web

**Problème** : Avoir deux configurations Storybook (`.rnstorybook/` pour mobile et `.storybook/` pour web) crée des conflits de dépendances entre `@storybook/react-native` (v8) et `@storybook/react` (v8).

**Symptôme** : `Unable to resolve module storybook/manager-api`

**Solution** : Choisir UN seul Storybook. Le web est recommandé car :
- Plus facile à utiliser (navigateur)
- Meilleure documentation avec MDX
- Pas de conflit avec l'app Expo
- Plus stable

### Erreur 2 : Emojis d'abord, refactor après

**Problème** : Créer les écrans avec des emojis "temporairement", puis devoir tout refactoriser.

**Solution** :
1. Installer `lucide-react-native` dès le début
2. Créer les composants avec support `icon: ReactNode`
3. Ne JAMAIS utiliser d'emoji, même "pour tester"

### Erreur 3 : Noms de props incohérents

**Problème** : Utiliser `label` dans un composant, `title` dans un autre pour la même chose.

**Exemples de confusion** :
- `label` vs `title`
- `showDivider` vs `showBorder`
- `onToggle` vs `onValueChange`
- `emoji` vs `icon`

**Solution** : Établir une convention dès le début (voir tableau dans section 3).

### Erreur 4 : Structure des tokens mal documentée

**Problème** : Référencer `colors.status.error` alors que c'était `colors.semantic.error`.

**Solution** :
- Documenter clairement la structure dans `theme.ts`
- Utiliser TypeScript pour l'autocomplétion
- Ajouter des commentaires JSDoc

### Erreur 5 : Dépendances conflictuelles

**Problème** : `react-native-reanimated` v4 nécessite `react-native-worklets` séparément.

**Solution** :
```bash
npm install react-native-worklets
# ou downgrade
npm install react-native-reanimated@~4.1.1
```

---

## 5. Bonnes pratiques

### A. Architecture du thème

```typescript
// Structure recommandée pour colors
export const colors = {
  background: {
    primary: '',    // Fond principal de l'app
    secondary: '',  // Fond secondaire (sections)
    surface: '',    // Fond des cartes/modales
    muted: '',      // Fond désactivé/subtle
  },
  text: {
    primary: '',    // Texte principal
    secondary: '',  // Texte secondaire
    muted: '',      // Texte désactivé
    inverse: '',    // Texte sur fond sombre
  },
  accent: {
    default: '',    // Couleur d'accent principale
    soft: '',       // Version légère (backgrounds)
    hover: '',      // État hover/pressed
  },
  semantic: {
    success: '',
    successSoft: '',
    error: '',
    errorSoft: '',
    warning: '',
    warningSoft: '',
  },
  border: {
    default: '',    // Bordures normales
    subtle: '',     // Bordures subtiles (dividers)
  },
};
```

### B. Composants systématiques

**Règle** : Si un élément UI apparaît plus d'une fois → créer un composant.

| Pattern répété | Composant |
|----------------|-----------|
| Bouton avec icône seule | `IconButton` |
| Ligne de paramètres | `ListItem` |
| Header d'écran | `ScreenHeader` |
| Carte sélectionnable | `SelectCard` |
| Carte simple | `Card` |

### C. Stories bien documentées

```typescript
/**
 * # ListItem
 *
 * Élément de liste pour les menus et paramètres.
 * **Supporte le Dark Mode**
 *
 * ## Types
 * - `navigation` : Avec chevron, cliquable
 * - `toggle` : Avec switch
 * - `info` : Affiche une valeur
 *
 * ## Props communes
 * - `icon` : ReactNode optionnel
 * - `title` : Texte principal
 * - `description` : Texte secondaire
 * - `showBorder` : Séparateur (default: true)
 */
```

### D. Dark mode first

- Toujours définir `colors` ET `darkColors`
- Tester systématiquement les deux modes
- Utiliser `useTheme()` partout
- Ne jamais hardcoder de couleur

### E. Export centralisé

```typescript
// components/index.ts
export { Button } from './Button';
export { Card } from './Card';
export { IconButton } from './IconButton';
export { ListItem } from './ListItem';
export { ScreenHeader } from './ScreenHeader';
export { SelectCard } from './SelectCard';

// Usage
import { Button, Card, IconButton } from '../components';
```

---

## 6. Workflow recommandé

### Jour 1 : Setup design system

1. Créer `src/design-system/theme.ts` avec tous les tokens
2. Créer `ThemeProvider.tsx` avec support dark mode
3. Setup Storybook web uniquement
4. Créer stories Introduction, Colors, Typography

```bash
npm install lucide-react-native react-native-svg
npx storybook@latest init --type react
```

### Jour 2 : Composants de base

1. `Button` (primary, secondary, ghost)
2. `Card` (elevated, outlined, filled)
3. Stories pour chaque variante
4. Tester dark mode

### Jour 3 : Composants de navigation

1. `IconButton` (default, ghost, muted)
2. `ScreenHeader`
3. Créer les icônes nécessaires avec Lucide
4. Stories

### Jour 4 : Composants de sélection

1. `SelectCard` avec support `icon`
2. `ListItem` (navigation, toggle, info)
3. Illustrations SVG si nécessaire
4. Stories

### Jour 5+ : Écrans

1. Utiliser UNIQUEMENT les composants système
2. Jamais d'emoji
3. Toujours `useTheme()`
4. Tester dark mode à chaque écran

---

## 7. Checklist

### Avant de commencer

- [ ] Brand guidelines documentés
- [ ] Palette de couleurs complète (light + dark)
- [ ] Décision ferme : emojis interdits
- [ ] Bibliothèque d'icônes choisie (lucide-react-native)
- [ ] Liste des composants nécessaires
- [ ] Convention de nommage des props établie
- [ ] Storybook web uniquement

### Pendant le développement

- [ ] Chaque composant a une story
- [ ] Chaque story documente toutes les variantes
- [ ] Dark mode testé pour chaque composant
- [ ] Aucune couleur hardcodée
- [ ] Aucun emoji dans le code
- [ ] TypeScript sans erreur
- [ ] Export centralisé dans index.ts

### Avant de livrer

- [ ] Toutes les stories passent
- [ ] Dark mode fonctionne partout
- [ ] Aucun warning TypeScript
- [ ] Guidelines documentées
- [ ] README à jour

---

## Exemple concret : Runnabis

### Tokens utilisés

- **Accent** : Teal (#0D9488) - couleur principale
- **Direction** : "Warm Adult" - chaleureux mais mature
- **Interdits** : Emojis, ton corporate, MAJUSCULES agressives
- **Icônes** : Lucide, outlined, stroke 2px

### Composants créés

1. `Button` - 3 variantes, 3 tailles
2. `Card` - 3 variantes
3. `IconButton` - 3 variantes, 3 tailles
4. `ListItem` - 3 types
5. `ScreenHeader` - avec/sans back, avec/sans action droite
6. `SelectCard` - avec icône optionnelle
7. `WorkoutIllustration` - SVG par type de séance

### Structure finale

```
src/
├── design-system/
│   ├── index.ts
│   ├── theme.ts
│   └── ThemeProvider.tsx
├── components/
│   ├── index.ts
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Checkbox.tsx
│   ├── IconButton.tsx
│   ├── ListItem.tsx
│   ├── ScreenHeader.tsx
│   ├── SelectCard.tsx
│   ├── Stepper.tsx
│   ├── WorkoutCard.tsx
│   └── illustrations/
│       ├── index.ts
│       └── WorkoutIllustration.tsx
├── screens/
│   ├── HomeScreen.tsx
│   ├── OnboardingWelcome.tsx
│   ├── OnboardingRaceSelection.tsx
│   ├── OnboardingLevelSelection.tsx
│   ├── OnboardingDuration.tsx
│   ├── SettingsScreen.tsx
│   └── WorkoutDetailScreen.tsx
└── stories/
    ├── Introduction.stories.tsx
    ├── Guidelines.stories.tsx
    ├── Colors.stories.tsx
    ├── Typography.stories.tsx
    ├── Button.stories.tsx
    ├── Card.stories.tsx
    ├── IconButton.stories.tsx
    ├── ListItem.stories.tsx
    ├── ScreenHeader.stories.tsx
    ├── SelectCard.stories.tsx
    └── WorkoutIllustration.stories.tsx
```

---

## Ressources

- [Lucide Icons](https://lucide.dev/) - Bibliothèque d'icônes
- [Storybook React Native Web](https://storybook.js.org/docs/react/get-started/install) - Documentation
- [React Native SVG](https://github.com/software-mansion/react-native-svg) - Pour les illustrations

---

*Guide créé pour le projet Runnabis - Février 2025*
