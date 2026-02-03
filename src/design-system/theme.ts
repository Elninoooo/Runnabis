/**
 * Runnabis Theme System
 *
 * Tokens adaptatifs pour Light et Dark mode
 * Direction "Warm Adult" - Chaleureux même en dark mode
 */

// =============================================================================
// THEME COLORS
// =============================================================================

export const lightColors = {
  // Backgrounds
  background: {
    primary: '#FAF8F5',      // Page background (warm off-white)
    secondary: '#F5F3F0',    // Secondary background
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

  // Workout types
  workout: {
    endurance: '#DCE8E0',
    fractionne: '#F2E0DC',
    allure: '#DCE0E8',
    sortieLongue: '#E8E4D8',
    recuperation: '#E4DCE8',
  },
};

export const darkColors = {
  // Backgrounds - Warm dark, pas noir pur
  background: {
    primary: '#1A1917',       // Page background (warm dark)
    secondary: '#242320',     // Secondary background
    surface: '#2E2C2A',       // Cards, modals
    surfaceHover: '#3A3836',  // Hover states
    elevated: '#3A3836',      // Elevated surfaces
    muted: '#242320',         // Disabled, progress bar bg
  },

  // Text - Inversé mais pas blanc pur
  text: {
    primary: '#FAF8F5',       // Headings, body text
    secondary: '#B8B4AE',     // Secondary info
    muted: '#7A7570',         // Placeholders, captions
    inverse: '#1A1A1A',       // Text on light bg (pour les boutons)
  },

  // Accent - Légèrement plus lumineux en dark
  accent: {
    default: '#5AB8A7',       // Buttons, links - plus lumineux
    hover: '#4A9D8E',         // Hover states
    soft: 'rgba(90, 184, 167, 0.15)',    // Badges, soft backgrounds
    medium: 'rgba(90, 184, 167, 0.25)',  // Selected states
  },

  // Semantic - Plus lumineux pour contraste
  semantic: {
    success: '#5AB8A7',
    successSoft: 'rgba(90, 184, 167, 0.15)',
    error: '#E07A6B',
    errorSoft: 'rgba(224, 122, 107, 0.15)',
    warning: '#E8A76A',
    warningSoft: 'rgba(232, 167, 106, 0.15)',
  },

  // Borders - Plus subtils en dark
  border: {
    default: '#3A3836',       // Card borders, dividers
    subtle: '#2E2C2A',        // Subtle separators
    strong: '#4A4744',        // Strong borders
  },

  // Workout types - Versions sombres
  workout: {
    endurance: '#2A3D35',
    fractionne: '#3D2A28',
    allure: '#2A2D3D',
    sortieLongue: '#3D3A2A',
    recuperation: '#352A3D',
  },
};

// =============================================================================
// THEME TYPE
// =============================================================================

export type ThemeMode = 'light' | 'dark';

export type ThemeColors = typeof lightColors;

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
}

// =============================================================================
// GET THEME FUNCTION
// =============================================================================

export function getTheme(mode: ThemeMode): Theme {
  return {
    mode,
    colors: mode === 'dark' ? darkColors : lightColors,
  };
}

// =============================================================================
// SHADOWS BY THEME
// =============================================================================

export const getShadows = (mode: ThemeMode) => ({
  sm: {
    shadowColor: mode === 'dark' ? '#000000' : '#1A1A1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: mode === 'dark' ? 0.3 : 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: mode === 'dark' ? '#000000' : '#1A1A1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: mode === 'dark' ? 0.4 : 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  lg: {
    shadowColor: mode === 'dark' ? '#000000' : '#1A1A1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: mode === 'dark' ? 0.5 : 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  xl: {
    shadowColor: mode === 'dark' ? '#000000' : '#1A1A1A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: mode === 'dark' ? 0.6 : 0.08,
    shadowRadius: 32,
    elevation: 8,
  },
});
