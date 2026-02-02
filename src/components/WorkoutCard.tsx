import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../design-system';
import { Workout } from '../types';
import { WORKOUT_INFO } from '../utils';

interface WorkoutCardProps {
  /** La séance à afficher */
  workout: Workout;
  /** Fonction appelée au clic */
  onPress?: () => void;
  /** Affichage compact (pour le calendrier) */
  compact?: boolean;
}

/**
 * WorkoutCard - Carte d'une séance d'entraînement
 *
 * Affiche les infos d'une séance avec son état (à faire / fait).
 */
export function WorkoutCard({ workout, onPress, compact = false }: WorkoutCardProps) {
  const info = WORKOUT_INFO[workout.type];

  // Formater la date
  const formatDate = (date: Date) => {
    const d = new Date(date);
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const months = [
      'jan', 'fév', 'mar', 'avr', 'mai', 'juin',
      'juil', 'août', 'sept', 'oct', 'nov', 'déc'
    ];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
  };

  if (compact) {
    return (
      <TouchableOpacity
        style={[
          styles.compactContainer,
          workout.completed && styles.completed,
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.compactEmoji}>{info.emoji}</Text>
        <Text
          style={[styles.compactTitle, workout.completed && styles.completedText]}
          numberOfLines={1}
        >
          {workout.duration} min
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, workout.completed && styles.completed]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Barre de couleur à gauche */}
      <View style={[styles.colorBar, { backgroundColor: info.color }]} />

      {/* Contenu */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>{info.emoji}</Text>
          <View style={styles.headerText}>
            <Text
              style={[styles.title, workout.completed && styles.completedText]}
            >
              {info.title}
            </Text>
            <Text style={styles.date}>{formatDate(workout.date)}</Text>
          </View>

          {/* Badge durée */}
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{workout.duration} min</Text>
          </View>
        </View>

        {/* Status */}
        {workout.completed && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeText}>✓ Terminé</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  completed: {
    opacity: 0.7,
  },
  colorBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 28,
    marginRight: spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.neutral[500],
  },
  date: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    marginTop: 2,
  },
  durationBadge: {
    backgroundColor: colors.neutral[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  durationText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral[700],
  },
  completedBadge: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
    backgroundColor: colors.primary[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  completedBadgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary[700],
  },

  // Compact
  compactContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral[50],
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    minWidth: 60,
  },
  compactEmoji: {
    fontSize: 20,
  },
  compactTitle: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[600],
    marginTop: 2,
  },
});
