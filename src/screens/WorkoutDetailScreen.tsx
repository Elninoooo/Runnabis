import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Button } from '../components';
import { colors, typography, spacing, borderRadius } from '../design-system';
import { Workout } from '../types';
import { WORKOUT_INFO } from '../utils';

interface WorkoutDetailScreenProps {
  /** La séance à afficher */
  workout: Workout;
  /** Retour à l'écran précédent */
  onBack: () => void;
  /** Marquer comme fait/pas fait */
  onToggleComplete: () => void;
}

/**
 * WorkoutDetailScreen - Détail d'une séance
 */
export function WorkoutDetailScreen({
  workout,
  onBack,
  onToggleComplete,
}: WorkoutDetailScreenProps) {
  const info = WORKOUT_INFO[workout.type];

  // Formater la date
  const formatDate = (date: Date) => {
    const d = new Date(date);
    const days = [
      'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
      'Jeudi', 'Vendredi', 'Samedi'
    ];
    const months = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Button label="← Retour" onPress={onBack} variant="ghost" size="sm" />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: info.color + '20' }]}>
          <Text style={styles.emoji}>{info.emoji}</Text>
          <Text style={styles.title}>{info.title}</Text>
          <Text style={styles.date}>{formatDate(workout.date)}</Text>

          {/* Stats */}
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{workout.duration}</Text>
              <Text style={styles.statLabel}>minutes</Text>
            </View>
            {workout.distance && (
              <View style={styles.stat}>
                <Text style={styles.statValue}>{workout.distance}</Text>
                <Text style={styles.statLabel}>km</Text>
              </View>
            )}
          </View>
        </View>

        {/* Status */}
        {workout.completed && (
          <View style={styles.completedBanner}>
            <Text style={styles.completedText}>✓ Séance terminée</Text>
          </View>
        )}

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pourquoi cette séance ?</Text>
          <Text style={styles.description}>{info.description}</Text>
        </View>

        {/* Conseils selon le type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conseils</Text>
          {workout.type === 'endurance-fondamentale' && (
            <View style={styles.tips}>
              <TipItem emoji="💬" text="Tu dois pouvoir tenir une conversation" />
              <TipItem emoji="❤️" text="Reste en zone 2 (60-70% FCM)" />
              <TipItem emoji="🎯" text="L'objectif est la durée, pas la vitesse" />
            </View>
          )}
          {workout.type === 'fractionne' && (
            <View style={styles.tips}>
              <TipItem emoji="🔥" text="Échauffe-toi bien pendant 10-15 min" />
              <TipItem emoji="⚡" text="Les phases rapides : tu ne peux pas parler" />
              <TipItem emoji="🧘" text="Récupération active entre les intervalles" />
            </View>
          )}
          {workout.type === 'sortie-longue' && (
            <View style={styles.tips}>
              <TipItem emoji="💧" text="Hydrate-toi avant et pendant" />
              <TipItem emoji="🍌" text="Prévois une collation si > 1h30" />
              <TipItem emoji="🐢" text="Pars doucement, tu accéléreras à la fin" />
            </View>
          )}
          {workout.type === 'allure-specifique' && (
            <View style={styles.tips}>
              <TipItem emoji="⏱️" text="Utilise un GPS pour contrôler ton allure" />
              <TipItem emoji="🎯" text="C'est l'allure de ta course objectif" />
              <TipItem emoji="🧠" text="Mémorise les sensations à cette vitesse" />
            </View>
          )}
          {workout.type === 'recuperation' && (
            <View style={styles.tips}>
              <TipItem emoji="🐌" text="Vraiment très lent, c'est le but !" />
              <TipItem emoji="😊" text="Profite du paysage, détends-toi" />
              <TipItem emoji="💪" text="Ça aide tes muscles à récupérer" />
            </View>
          )}
          {workout.type === 'repos' && (
            <View style={styles.tips}>
              <TipItem emoji="😴" text="Le repos fait partie de l'entraînement" />
              <TipItem emoji="🧘" text="Étirements ou yoga si tu veux bouger" />
              <TipItem emoji="🍽️" text="Mange bien et dors suffisamment" />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          label={workout.completed ? 'Marquer comme à faire' : 'Marquer comme terminée'}
          onPress={onToggleComplete}
          variant={workout.completed ? 'secondary' : 'primary'}
          size="lg"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

// Composant pour un conseil
function TipItem({ emoji, text }: { emoji: string; text: string }) {
  return (
    <View style={styles.tipItem}>
      <Text style={styles.tipEmoji}>{emoji}</Text>
      <Text style={styles.tipText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[0],
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xl,
  },

  // Hero
  hero: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
    paddingHorizontal: spacing.lg,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: typography.fontSize.md,
    color: colors.neutral[600],
    marginBottom: spacing.lg,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
  },

  // Completed banner
  completedBanner: {
    backgroundColor: colors.primary[100],
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  completedText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary[700],
  },

  // Section
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.fontSize.md,
    color: colors.neutral[700],
    lineHeight: typography.fontSize.md * typography.lineHeight.relaxed,
  },

  // Tips
  tips: {
    gap: spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  tipEmoji: {
    fontSize: 20,
  },
  tipText: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.neutral[700],
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
  },

  // Footer
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
});
