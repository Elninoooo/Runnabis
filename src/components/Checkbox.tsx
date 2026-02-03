import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../design-system';

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
 * Supporte le Dark Mode.
 */
export function Checkbox({
  label,
  checked,
  onToggle,
  disabled = false,
}: CheckboxProps) {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { paddingVertical: spacing.sm, gap: spacing.md },
        disabled && styles.disabled,
      ]}
      onPress={onToggle}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.box,
          {
            borderRadius: borderRadius.sm,
            borderColor: checked ? colors.accent.default : colors.border.strong,
            backgroundColor: checked ? colors.accent.default : colors.background.surface,
          },
        ]}
      >
        {checked && (
          <Text style={[styles.checkmark, { color: colors.text.inverse }]}>
            ✓
          </Text>
        )}
      </View>
      <Text
        style={[
          styles.label,
          {
            fontSize: typography.fontSize.md,
            color: checked ? colors.text.primary : colors.text.secondary,
            fontWeight: checked ? typography.fontWeight.medium : typography.fontWeight.regular,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 14,
    fontWeight: '700',
  },
  label: {},
});
