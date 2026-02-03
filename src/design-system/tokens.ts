/**
 * Runnabis Design System Tokens
 *
 * Basé sur le design system Movo - Direction "Warm Adult"
 * Entre Bend (minimal) et Duolingo (playful)
 *
 * Personnalité : Chaleureux, Encourageant, Accessible, Adulte
 */

// =============================================================================
// COLORS
// =============================================================================

export const colors = {
  // Backgrounds
  background: {
    primary: '#FAF8F5',      // Page background (warm off-white)
    surface: '#FFFFFF',       // Cards, modals
    surfaceHover: '#F5F3F0',  // Hover states
    elevated: '#FFFFFF',      // Elevated surfaces
    muted: '#F0EDE8',         // Disabled, progress bar bg
  },

  // Text
  text: {
    primary: '#1A1A1A',       // Headings, body text
    secondary: '#6B6560',     // Secondary info
    muted: '#9A958E',         // Placeholders, captions
    inverse: '#FFFFFF',       // Text on dark bg
  },

  // Accent (Teal - couleur principale)
  accent: {
    default: '#4A9D8E',       // Buttons, links, active states
    hover: '#3D8577',         // Hover states
    soft: 'rgba(74, 157, 142, 0.10)',    // Badges, soft backgrounds
    medium: 'rgba(74, 157, 142, 0.20)',  // Selected states
  },

  // Semantic
  semantic: {
    success: '#3D8577',
    successSoft: 'rgba(61, 133, 119, 0.12)',
    error: '#C45D4F',
    errorSoft: 'rgba(196, 93, 79, 0.12)',
    warning: '#D4915A',
    warningSoft: 'rgba(212, 145, 90, 0.12)',
  },

  // Borders
  border: {
    default: '#E8E4DE',       // Card borders, dividers
    subtle: '#F0EDE8',        // Subtle separators
    strong: '#D8D4CE',        // Strong borders
  },

  // Couleurs par type d'entraînement
  workout: {
    endurance: '#DCE8E0',       // Endurance fondamentale - Vert doux
    fractionne: '#F2E0DC',      // Fractionné - Rose saumon
    allure: '#DCE0E8',          // Allure spécifique - Bleu gris
    sortieLongue: '#E8E4D8',    // Sortie longue - Beige
    recuperation: '#E4DCE8',    // Récupération - Lavande
  },

  // Legacy aliases (pour compatibilité avec le code existant)
  primary: {
    50: 'rgba(74, 157, 142, 0.05)',
    100: 'rgba(74, 157, 142, 0.10)',
    200: 'rgba(74, 157, 142, 0.20)',
    300: 'rgba(74, 157, 142, 0.30)',
    400: 'rgba(74, 157, 142, 0.40)',
    500: '#4A9D8E',
    600: '#3D8577',
    700: '#306B60',
    800: '#24524A',
    900: '#183833',
  },

  neutral: {
    0: '#FFFFFF',
    50: '#FAF8F5',
    100: '#F5F3F0',
    200: '#F0EDE8',
    300: '#E8E4DE',
    400: '#D8D4CE',
    500: '#9A958E',
    600: '#6B6560',
    700: '#4A4744',
    800: '#2E2C2A',
    900: '#1A1A1A',
  },

  // Semantic legacy
  success: '#3D8577',
  warning: '#D4915A',
  error: '#C45D4F',
  info: '#5A7A9D',
};

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const typography = {
  fontFamily: {
    primary: 'System',
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },

  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  fontSize: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 16,
    lg: 18,
    xl: 22,
    '2xl': 28,
    '3xl': 34,
    '4xl': 34, // alias
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },

  // Styles prédéfinis
  scale: {
    display: {
      fontSize: 34,
      fontWeight: '600' as const,
      lineHeight: 1.2,
    },
    h1: {
      fontSize: 28,
      fontWeight: '600' as const,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 22,
      fontWeight: '600' as const,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 1.4,
    },
    body: {
      fontSize: 15,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: 13,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: 13,
      fontWeight: '500' as const,
      lineHeight: 1.4,
    },
    button: {
      fontSize: 16,
      fontWeight: '500' as const,
      lineHeight: 1,
    },
  },
};

// =============================================================================
// SPACING (Base unit: 4px)
// =============================================================================

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,

  // Alias sémantiques
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const borderRadius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  full: 9999,
};

// =============================================================================
// SHADOWS (Light, subtle shadows)
// =============================================================================

export const shadows = {
  sm: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  lg: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  xl: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 8,
  },
};

// =============================================================================
// MOTION
// =============================================================================

export const motion = {
  duration: {
    instant: 50,
    fast: 150,
    normal: 250,
    slow: 350,
    slower: 500,
  },
};

// =============================================================================
// COMPONENT SPECS
// =============================================================================

export const components = {
  button: {
    primary: {
      minHeight: 52,
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderRadius: 16,
    },
    secondary: {
      minHeight: 44,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 12,
    },
    small: {
      minHeight: 36,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 10,
    },
  },
  card: {
    padding: 24,
    borderRadius: 24,
    gap: 20,
  },
  input: {
    minHeight: 48,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
};

// =============================================================================
// WORKOUT TYPE COLORS
// =============================================================================

export const workoutColors: Record<string, { bg: string; accent: string }> = {
  'endurance-fondamentale': {
    bg: colors.workout.endurance,
    accent: '#4A9D8E',
  },
  'fractionne': {
    bg: colors.workout.fractionne,
    accent: '#C45D4F',
  },
  'allure-specifique': {
    bg: colors.workout.allure,
    accent: '#5A7A9D',
  },
  'sortie-longue': {
    bg: colors.workout.sortieLongue,
    accent: '#9D8A5A',
  },
  'recuperation': {
    bg: colors.workout.recuperation,
    accent: '#8A5A9D',
  },
  'repos': {
    bg: colors.background.muted,
    accent: colors.text.muted,
  },
};
