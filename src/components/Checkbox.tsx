import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../design-system';

interface CheckboxProps {
  /** Label affiché à côté de la checkbox */
  label: string;
  /** Est-ce que la checkbox est cochée ? */
  checked: boolean;
  /** Fonction appelée au clic */
  onToggle: () => void;
  /** Désactive la checkbox */
  disabled?: boolean;
}

/**
 * Checkbox - Case à cocher
 *
 * Utilisée pour les sélections multiples (jours disponibles, etc.)
 */
export function Checkbox({
  label,
  checked,
  onToggle,
  disabled = false,
}: CheckboxProps) {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled]}
      onPress={onToggle}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={[styles.label, checked && styles.labelChecked]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  disabled: {
    opacity: 0.5,
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: colors.neutral[400],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral[0],
  },
  boxChecked: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  checkmark: {
    color: colors.neutral[0],
    fontSize: 14,
    fontWeight: typography.fontWeight.bold,
  },
  label: {
    fontSize: typography.fontSize.md,
    color: colors.neutral[700],
  },
  labelChecked: {
    color: colors.neutral[900],
    fontWeight: typography.fontWeight.medium,
  },
});
