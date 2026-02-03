import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Button } from '../components';
import { useTheme } from '../design-system';
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
  const { colors, typography, spacing, borderRadius } = useTheme();
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.md, paddingTop: spacing.sm }]}>
        <Button label="← Retour" onPress={onBack} variant="ghost" size="sm" />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: info.color + '20', paddingVertical: spacing['2xl'], paddingHorizontal: spacing.lg }]}>
          <Text style={styles.emoji}>{info.emoji}</Text>
          <Text style={[styles.title, { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.text.primary, marginBottom: spacing.xs }]}>
            {info.title}
          </Text>
          <Text style={[styles.date, { fontSize: typography.fontSize.md, color: colors.text.secondary, marginBottom: spacing.lg }]}>
            {formatDate(workout.date)}
          </Text>

          {/* Stats */}
          <View style={[styles.stats, { gap: spacing.xl }]}>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: colors.text.primary }]}>
                {workout.duration}
              </Text>
              <Text style={[styles.statLabel, { fontSize: typography.fontSize.sm, color: colors.text.secondary }]}>
                minutes
              </Text>
            </View>
            {workout.distance && (
              <View style={styles.stat}>
                <Text style={[styles.statValue, { fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: colors.text.primary }]}>
                  {workout.distance}
                </Text>
                <Text style={[styles.statLabel, { fontSize: typography.fontSize.sm, color: colors.text.secondary }]}>
                  km
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Status */}
        {workout.completed && (
          <View style={[styles.completedBanner, { backgroundColor: colors.accent.soft, paddingVertical: spacing.sm }]}>
            <Text style={[styles.completedText, { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.medium, color: colors.accent.default }]}>
              ✓ Séance terminée
            </Text>
          </View>
        )}

        {/* Description */}
        <View style={[styles.section, { paddingHorizontal: spacing.lg, paddingTop: spacing.lg }]}>
          <Text style={[styles.sectionTitle, { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, color: colors.text.primary, marginBottom: spacing.sm }]}>
            Pourquoi cette séance ?
          </Text>
          <Text style={[styles.description, { fontSize: typography.fontSize.md, color: colors.text.secondary, lineHeight: typography.fontSize.md * typography.lineHeight.relaxed }]}>
            {info.description}
          </Text>
        </View>

        {/* Conseils selon le type */}
        <View style={[styles.section, { paddingHorizontal: spacing.lg, paddingTop: spacing.lg }]}>
          <Text style={[styles.sectionTitle, { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, color: colors.text.primary, marginBottom: spacing.sm }]}>
            Conseils
          </Text>
          {workout.type === 'endurance-fondamentale' && (
            <View style={[styles.tips, { gap: spacing.sm }]}>
              <TipItem emoji="💬" text="Tu dois pouvoir tenir une conversation" />
              <TipItem emoji="❤️" text="Reste en zone 2 (60-70% FCM)" />
              <TipItem emoji="🎯" text="L'objectif est la durée, pas la vitesse" />
            </View>
          )}
          {workout.type === 'fractionne' && (
            <View style={[styles.tips, { gap: spacing.sm }]}>
              <TipItem emoji="🔥" text="Échauffe-toi bien pendant 10-15 min" />
              <TipItem emoji="⚡" text="Les phases rapides : tu ne peux pas parler" />
              <TipItem emoji="🧘" text="Récupération active entre les intervalles" />
            </View>
          )}
          {workout.type === 'sortie-longue' && (
            <View style={[styles.tips, { gap: spacing.sm }]}>
              <TipItem emoji="💧" text="Hydrate-toi avant et pendant" />
              <TipItem emoji="🍌" text="Prévois une collation si > 1h30" />
              <TipItem emoji="🐢" text="Pars doucement, tu accéléreras à la fin" />
            </View>
          )}
          {workout.type === 'allure-specifique' && (
            <View style={[styles.tips, { gap: spacing.sm }]}>
              <TipItem emoji="⏱️" text="Utilise un GPS pour contrôler ton allure" />
              <TipItem emoji="🎯" text="C'est l'allure de ta course objectif" />
              <TipItem emoji="🧠" text="Mémorise les sensations à cette vitesse" />
            </View>
          )}
          {workout.type === 'recuperation' && (
            <View style={[styles.tips, { gap: spacing.sm }]}>
              <TipItem emoji="🐌" text="Vraiment très lent, c'est le but !" />
              <TipItem emoji="😊" text="Profite du paysage, détends-toi" />
              <TipItem emoji="💪" text="Ça aide tes muscles à récupérer" />
            </View>
          )}
          {workout.type === 'repos' && (
            <View style={[styles.tips, { gap: spacing.sm }]}>
              <TipItem emoji="😴" text="Le repos fait partie de l'entraînement" />
              <TipItem emoji="🧘" text="Étirements ou yoga si tu veux bouger" />
              <TipItem emoji="🍽️" text="Mange bien et dors suffisamment" />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.border.default }]}>
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
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.tipItem, { gap: spacing.sm }]}>
      <Text style={styles.tipEmoji}>{emoji}</Text>
      <Text style={[styles.tipText, { fontSize: typography.fontSize.md, color: colors.text.secondary, lineHeight: typography.fontSize.md * typography.lineHeight.normal }]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  content: {
    flex: 1,
  },
  contentContainer: {},

  // Hero
  hero: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {},
  date: {},
  stats: {
    flexDirection: 'row',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {},
  statLabel: {},

  // Completed banner
  completedBanner: {
    alignItems: 'center',
  },
  completedText: {},

  // Section
  section: {},
  sectionTitle: {},
  description: {},

  // Tips
  tips: {},
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipEmoji: {
    fontSize: 20,
  },
  tipText: {
    flex: 1,
  },

  // Footer
  footer: {},
});
