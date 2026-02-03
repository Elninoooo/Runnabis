import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../design-system';
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
 * Supporte le Dark Mode.
 */
export function WorkoutCard({ workout, onPress, compact = false }: WorkoutCardProps) {
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();
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
          {
            backgroundColor: colors.background.muted,
            borderRadius: borderRadius.md,
            padding: spacing.sm,
          },
          workout.completed && styles.completed,
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.compactEmoji}>{info.emoji}</Text>
        <Text
          style={[
            styles.compactTitle,
            {
              fontSize: typography.fontSize.xs,
              color: colors.text.secondary,
            },
            workout.completed && { color: colors.text.muted },
          ]}
          numberOfLines={1}
        >
          {workout.duration} min
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.background.surface,
          borderRadius: borderRadius.lg,
          ...shadows.sm,
        },
        workout.completed && styles.completed,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Barre de couleur à gauche */}
      <View style={[styles.colorBar, { backgroundColor: info.color }]} />

      {/* Contenu */}
      <View style={[styles.content, { padding: spacing.md }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.emoji, { marginRight: spacing.sm }]}>{info.emoji}</Text>
          <View style={styles.headerText}>
            <Text
              style={[
                styles.title,
                {
                  fontSize: typography.fontSize.md,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.text.primary,
                },
                workout.completed && {
                  textDecorationLine: 'line-through',
                  color: colors.text.muted,
                },
              ]}
            >
              {info.title}
            </Text>
            <Text
              style={[
                styles.date,
                {
                  fontSize: typography.fontSize.sm,
                  color: colors.text.muted,
                },
              ]}
            >
              {formatDate(workout.date)}
            </Text>
          </View>

          {/* Badge durée */}
          <View
            style={[
              styles.durationBadge,
              {
                backgroundColor: colors.background.muted,
                paddingHorizontal: spacing.sm,
                paddingVertical: spacing.xs,
                borderRadius: borderRadius.full,
              },
            ]}
          >
            <Text
              style={[
                styles.durationText,
                {
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                  color: colors.text.secondary,
                },
              ]}
            >
              {workout.duration} min
            </Text>
          </View>
        </View>

        {/* Status */}
        {workout.completed && (
          <View
            style={[
              styles.completedBadge,
              {
                backgroundColor: colors.accent.soft,
                paddingHorizontal: spacing.sm,
                paddingVertical: spacing.xs,
                borderRadius: borderRadius.full,
                marginTop: spacing.sm,
              },
            ]}
          >
            <Text
              style={[
                styles.completedBadgeText,
                {
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.medium,
                  color: colors.accent.default,
                },
              ]}
            >
              Terminé
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  completed: {
    opacity: 0.7,
  },
  colorBar: {
    width: 4,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 28,
  },
  headerText: {
    flex: 1,
  },
  title: {},
  date: {
    marginTop: 2,
  },
  durationBadge: {},
  durationText: {},
  completedBadge: {
    alignSelf: 'flex-start',
  },
  completedBadgeText: {},
  compactContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  compactEmoji: {
    fontSize: 20,
  },
  compactTitle: {
    marginTop: 2,
  },
});
