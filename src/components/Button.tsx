import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../design-system';

/**
 * Les différentes variantes du bouton
 * - primary: Action principale (vert)
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
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.neutral[0] : colors.primary[500]}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.label,
            styles[`label_${variant}`],
            styles[`label_${size}`],
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Style de base commun à tous les boutons
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
  },

  // Variantes
  primary: {
    backgroundColor: colors.primary[500],
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary[500],
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // Tailles
  size_sm: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    minHeight: 36,
  },
  size_md: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  size_lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    minHeight: 56,
  },

  // États
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },

  // Labels
  label: {
    fontWeight: typography.fontWeight.semibold,
  },
  label_primary: {
    color: colors.neutral[0],
  },
  label_secondary: {
    color: colors.primary[500],
  },
  label_ghost: {
    color: colors.primary[500],
  },
  label_sm: {
    fontSize: typography.fontSize.sm,
  },
  label_md: {
    fontSize: typography.fontSize.md,
  },
  label_lg: {
    fontSize: typography.fontSize.lg,
  },
});
