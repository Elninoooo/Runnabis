import React, { useMemo } from 'react';
import type { Preview, Decorator } from '@storybook/react';
import { ThemeProvider } from '../src/design-system/ThemeContext';
import type { ThemeMode } from '../src/design-system/theme';

// Decorator qui wrap les stories avec le ThemeProvider
// Détecte le background sélectionné pour choisir le thème
const withTheme: Decorator = (Story, context) => {
  // Récupère le background sélectionné dans la toolbar
  const selectedBackground = context.globals.backgrounds?.value;

  // Si le background est sombre, on passe en dark mode
  const isDark = selectedBackground === '#1A1917';
  const theme: ThemeMode = isDark ? 'dark' : 'light';

  // Key unique pour forcer le re-render quand le thème change
  const key = `theme-${theme}`;

  return (
    <ThemeProvider key={key} initialMode={theme}>
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Light', value: '#FAF8F5' },
        { name: 'Dark', value: '#1A1917' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
  },
  decorators: [withTheme],
};

export default preview;
