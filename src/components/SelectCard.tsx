import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from '../design-system';

export interface SelectCardProps {
  /** Icône à afficher (composant Lucide) */
  icon?: React.ReactNode;
  /** Titre principal */
  title: string;
  /** Description optionnelle */
  description?: string;
  /** Est-ce que cette carte est sélectionnée ? */
  selected?: boolean;
  /** Fonction appelée au clic */
  onPress: () => void;
}

/**
 * SelectCard - Carte de sélection
 *
 * Utilisée pour les choix uniques (type de course, niveau, etc.)
 * Affiche un état sélectionné avec une bordure colorée.
 *
 * Supporte le Dark Mode.
 *
 * @example
 * ```tsx
 * import { Target } from 'lucide-react-native';
 *
 * <SelectCard
 *   icon={<Target size={24} color={colors.accent.default} />}
 *   title="Semi-marathon"
 *   description="21,1 km"
 *   selected={selected}
 *   onPress={() => setSelected(true)}
 * />
 * ```
 */
export function SelectCard({
  icon,
  title,
  description,
  selected = false,
  onPress,
}: SelectCardProps) {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          padding: spacing.md,
          borderRadius: borderRadius.lg,
          gap: spacing.md,
          backgroundColor: selected ? colors.accent.soft : colors.background.surface,
          borderColor: selected ? colors.accent.default : colors.border.default,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Indicateur de sélection */}
      <View
        style={[
          styles.radio,
          {
            borderColor: selected ? colors.accent.default : colors.border.strong,
          },
        ]}
      >
        {selected && (
          <View
            style={[
              styles.radioInner,
              { backgroundColor: colors.accent.default },
            ]}
          />
        )}
      </View>

      {/* Icône (optionnel) */}
      {icon && <View style={styles.iconContainer}>{icon}</View>}

      {/* Contenu */}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            {
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
              color: selected ? colors.accent.default : colors.text.primary,
            },
          ]}
        >
          {title}
        </Text>
        {description && (
          <Text
            style={[
              styles.description,
              {
                fontSize: typography.fontSize.sm,
                color: colors.text.secondary,
                marginTop: spacing.xs,
              },
            ]}
          >
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {},
  description: {},
});
