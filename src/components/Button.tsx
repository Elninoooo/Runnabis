import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../design-system';

/**
 * Les différentes variantes du bouton
 * - primary: Action principale (teal)
 * - secondary: Action secondaire (outline)
 * - ghost: Bouton discret (juste le texte)
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost';

/**
 * Les tailles disponibles
 */
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  /** Le texte affiché dans le bouton */
  label: string;
  /** Fonction appelée au clic */
  onPress: () => void;
  /** Variante visuelle du bouton */
  variant?: ButtonVariant;
  /** Taille du bouton */
  size?: ButtonSize;
  /** Désactive le bouton */
  disabled?: boolean;
  /** Affiche un loader */
  loading?: boolean;
  /** Prend toute la largeur disponible */
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
}: ButtonProps) {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const isDisabled = disabled || loading;

  // Styles dynamiques basés sur le thème
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: colors.accent.default,
          },
          label: {
            color: colors.text.inverse,
          },
          loaderColor: colors.text.inverse,
        };
      case 'secondary':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: colors.accent.default,
          },
          label: {
            color: colors.accent.default,
          },
          loaderColor: colors.accent.default,
        };
      case 'ghost':
        return {
          container: {
            backgroundColor: 'transparent',
          },
          label: {
            color: colors.accent.default,
          },
          loaderColor: colors.accent.default,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          container: {
            paddingVertical: spacing.xs,
            paddingHorizontal: spacing.md,
            minHeight: 36,
          },
          label: {
            fontSize: typography.fontSize.sm,
          },
        };
      case 'md':
        return {
          container: {
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.lg,
            minHeight: 48,
          },
          label: {
            fontSize: typography.fontSize.md,
          },
        };
      case 'lg':
        return {
          container: {
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.xl,
            minHeight: 56,
          },
          label: {
            fontSize: typography.fontSize.lg,
          },
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        styles.base,
        { borderRadius: borderRadius.lg },
        variantStyles.container,
        sizeStyles.container,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variantStyles.loaderColor}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.label,
            { fontWeight: typography.fontWeight.semibold },
            variantStyles.label,
            sizeStyles.label,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  label: {},
});
