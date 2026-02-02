import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../design-system';

interface SelectCardProps {
  /** Emoji ou icône affichée */
  emoji: string;
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
 */
export function SelectCard({
  emoji,
  title,
  description,
  selected = false,
  onPress,
}: SelectCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Indicateur de sélection */}
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>

      {/* Contenu */}
      <Text style={styles.emoji}>{emoji}</Text>
      <View style={styles.textContainer}>
        <Text style={[styles.title, selected && styles.titleSelected]}>
          {title}
        </Text>
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.neutral[200],
    gap: spacing.md,
  },
  selected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },

  // Radio button
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.neutral[400],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.primary[500],
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary[500],
  },

  // Emoji
  emoji: {
    fontSize: 32,
  },

  // Text
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
  },
  titleSelected: {
    color: colors.primary[700],
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
    marginTop: spacing.xs,
  },
});
