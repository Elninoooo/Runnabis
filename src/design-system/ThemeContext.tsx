import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { getTheme, getShadows, Theme, ThemeMode, ThemeColors } from './theme';
import { typography, spacing, borderRadius, components, motion } from './tokens';

// =============================================================================
// CONTEXT TYPE
// =============================================================================

interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeColors;
  typography: typeof typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  shadows: ReturnType<typeof getShadows>;
  components: typeof components;
  motion: typeof motion;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

// =============================================================================
// CONTEXT
// =============================================================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// =============================================================================
// PROVIDER
// =============================================================================

interface ThemeProviderProps {
  children: ReactNode;
  initialMode?: ThemeMode;
}

export function ThemeProvider({ children, initialMode = 'light' }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const value = useMemo(() => {
    const theme = getTheme(mode);
    const shadows = getShadows(mode);

    return {
      mode,
      colors: theme.colors,
      typography,
      spacing,
      borderRadius,
      shadows,
      components,
      motion,
      setMode,
      toggleMode: () => setMode(m => m === 'light' ? 'dark' : 'light'),
    };
  }, [mode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// =============================================================================
// HOOK
// =============================================================================

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    // Fallback pour quand le provider n'est pas présent (ex: Storybook)
    const theme = getTheme('light');
    const shadows = getShadows('light');

    return {
      mode: 'light',
      colors: theme.colors,
      typography,
      spacing,
      borderRadius,
      shadows,
      components,
      motion,
      setMode: () => {},
      toggleMode: () => {},
    };
  }

  return context;
}

// =============================================================================
// STORYBOOK CONTEXT (pour que Storybook puisse injecter le thème)
// =============================================================================

export const StorybookThemeContext = createContext<ThemeMode>('light');

export function useStorybookTheme(): ThemeMode {
  return useContext(StorybookThemeContext);
}
