import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../design-system';

interface StepperProps {
  /** Valeur actuelle */
  value: number;
  /** Valeur minimum */
  min: number;
  /** Valeur maximum */
  max: number;
  /** Fonction appelée quand la valeur change */
  onChange: (value: number) => void;
  /** Label affiché (ex: "séances par semaine") */
  label?: string;
}

/**
 * Stepper - Sélecteur de nombre
 *
 * Permet d'incrémenter/décrémenter une valeur numérique.
 */
export function Stepper({
  value,
  min,
  max,
  onChange,
  label,
}: StepperProps) {
  const canDecrement = value > min;
  const canIncrement = value < max;

  const handleDecrement = () => {
    if (canDecrement) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (canIncrement) {
      onChange(value + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepper}>
        <TouchableOpacity
          style={[styles.button, !canDecrement && styles.buttonDisabled]}
          onPress={handleDecrement}
          disabled={!canDecrement}
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, !canDecrement && styles.buttonTextDisabled]}>
            −
          </Text>
        </TouchableOpacity>

        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
          {label && <Text style={styles.label}>{label}</Text>}
        </View>

        <TouchableOpacity
          style={[styles.button, !canIncrement && styles.buttonDisabled]}
          onPress={handleIncrement}
          disabled={!canIncrement}
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, !canIncrement && styles.buttonTextDisabled]}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.neutral[200],
  },
  buttonText: {
    fontSize: 24,
    color: colors.neutral[0],
    fontWeight: typography.fontWeight.bold,
  },
  buttonTextDisabled: {
    color: colors.neutral[400],
  },
  valueContainer: {
    alignItems: 'center',
    minWidth: 80,
  },
  value: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
    marginTop: spacing.xs,
  },
});
