import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../design-system';

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
 * Supporte le Dark Mode.
 */
export function Stepper({
  value,
  min,
  max,
  onChange,
  label,
}: StepperProps) {
  const { colors, typography, spacing, borderRadius } = useTheme();

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
      <View style={[styles.stepper, { gap: spacing.lg }]}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderRadius: borderRadius.full,
              backgroundColor: canDecrement ? colors.accent.default : colors.background.muted,
            },
          ]}
          onPress={handleDecrement}
          disabled={!canDecrement}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: canDecrement ? colors.text.inverse : colors.text.muted,
                fontWeight: typography.fontWeight.bold,
              },
            ]}
          >
            −
          </Text>
        </TouchableOpacity>

        <View style={styles.valueContainer}>
          <Text
            style={[
              styles.value,
              {
                fontSize: typography.fontSize['4xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.text.primary,
              },
            ]}
          >
            {value}
          </Text>
          {label && (
            <Text
              style={[
                styles.label,
                {
                  fontSize: typography.fontSize.sm,
                  color: colors.text.secondary,
                  marginTop: spacing.xs,
                },
              ]}
            >
              {label}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            {
              borderRadius: borderRadius.full,
              backgroundColor: canIncrement ? colors.accent.default : colors.background.muted,
            },
          ]}
          onPress={handleIncrement}
          disabled={!canIncrement}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: canIncrement ? colors.text.inverse : colors.text.muted,
                fontWeight: typography.fontWeight.bold,
              },
            ]}
          >
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
  },
  button: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
  },
  valueContainer: {
    alignItems: 'center',
    minWidth: 80,
  },
  value: {},
  label: {},
});
