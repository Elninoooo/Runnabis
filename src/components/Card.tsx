import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../design-system';

interface CardProps {
  /** Contenu de la carte */
  children: React.ReactNode;
  /** Style personnalisé */
  style?: ViewStyle;
  /** Variante de la carte */
  variant?: 'elevated' | 'outlined' | 'filled';
  /** Padding interne */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Card - Conteneur avec fond et bordure
 *
 * Supporte le Dark Mode.
 */
export function Card({
  children,
  style,
  variant = 'elevated',
  padding = 'md',
}: CardProps) {
  const { colors, spacing, borderRadius, shadows } = useTheme();

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: colors.background.surface,
          ...shadows.md,
        };
      case 'outlined':
        return {
          backgroundColor: colors.background.surface,
          borderWidth: 1,
          borderColor: colors.border.default,
        };
      case 'filled':
        return {
          backgroundColor: colors.background.muted,
        };
    }
  };

  const getPaddingValue = (): number => {
    switch (padding) {
      case 'none':
        return 0;
      case 'sm':
        return spacing.sm;
      case 'md':
        return spacing.md;
      case 'lg':
        return spacing.lg;
    }
  };

  return (
    <View
      style={[
        {
          borderRadius: borderRadius.lg,
          padding: getPaddingValue(),
        },
        getVariantStyles(),
        style,
      ]}
    >
      {children}
    </View>
  );
}
