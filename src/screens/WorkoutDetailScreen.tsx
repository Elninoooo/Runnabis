import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  Check,
  MessageCircle,
  Heart,
  Target,
  Flame,
  Zap,
  Activity,
  Droplets,
  Apple,
  Timer,
  Brain,
  Snail,
  Smile,
  Dumbbell,
  Moon,
  Salad,
} from 'lucide-react-native';
import { Button, ScreenHeader } from '../components';
import { WorkoutIllustration } from '../components/illustrations';
import { useTheme } from '../design-system';
import { Workout, WorkoutType } from '../types';
import { WORKOUT_INFO } from '../utils';

interface WorkoutDetailScreenProps {
  /** La séance à afficher */
  workout: Workout;
  /** Retour à l'écran précédent */
  onBack: () => void;
  /** Marquer comme fait/pas fait */
  onToggleComplete: () => void;
}

// Mapping des conseils par type de workout avec icônes Lucide
const WORKOUT_TIPS: Record<WorkoutType, { icon: React.ComponentType<any>; text: string }[]> = {
  'endurance-fondamentale': [
    { icon: MessageCircle, text: 'Tu dois pouvoir tenir une conversation' },
    { icon: Heart, text: 'Reste en zone 2 (60-70% FCM)' },
    { icon: Target, text: "L'objectif est la durée, pas la vitesse" },
  ],
  'fractionne': [
    { icon: Flame, text: 'Échauffe-toi bien pendant 10-15 min' },
    { icon: Zap, text: 'Les phases rapides : tu ne peux pas parler' },
    { icon: Activity, text: 'Récupération active entre les intervalles' },
  ],
  'sortie-longue': [
    { icon: Droplets, text: 'Hydrate-toi avant et pendant' },
    { icon: Apple, text: 'Prévois une collation si > 1h30' },
    { icon: Snail, text: 'Pars doucement, tu accéléreras à la fin' },
  ],
  'allure-specifique': [
    { icon: Timer, text: 'Utilise un GPS pour contrôler ton allure' },
    { icon: Target, text: "C'est l'allure de ta course objectif" },
    { icon: Brain, text: 'Mémorise les sensations à cette vitesse' },
  ],
  'recuperation': [
    { icon: Snail, text: 'Vraiment très lent, c\'est le but !' },
    { icon: Smile, text: 'Profite du paysage, détends-toi' },
    { icon: Dumbbell, text: 'Ça aide tes muscles à récupérer' },
  ],
  'repos': [
    { icon: Moon, text: "Le repos fait partie de l'entraînement" },
    { icon: Activity, text: 'Étirements ou yoga si tu veux bouger' },
    { icon: Salad, text: 'Mange bien et dors suffisamment' },
  ],
};

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
  const tips = WORKOUT_TIPS[workout.type] || [];

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
      <ScreenHeader
        title={info.title}
        onBack={onBack}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: info.color + '15', paddingVertical: spacing['2xl'], paddingHorizontal: spacing.lg }]}>
          <View style={[styles.illustrationContainer, { marginBottom: spacing.lg }]}>
            <WorkoutIllustration type={workout.type} size="lg" />
          </View>
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
          <View style={[styles.completedBanner, { backgroundColor: colors.accent.soft, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, gap: spacing.xs }]}>
            <Check size={18} color={colors.accent.default} strokeWidth={2.5} />
            <Text style={[styles.completedText, { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.medium, color: colors.accent.default }]}>
              Séance terminée
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

        {/* Conseils */}
        {tips.length > 0 && (
          <View style={[styles.section, { paddingHorizontal: spacing.lg, paddingTop: spacing.lg }]}>
            <Text style={[styles.sectionTitle, { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, color: colors.text.primary, marginBottom: spacing.sm }]}>
              Conseils
            </Text>
            <View style={[styles.tips, { gap: spacing.md }]}>
              {tips.map((tip, index) => (
                <TipItem key={index} Icon={tip.icon} text={tip.text} />
              ))}
            </View>
          </View>
        )}
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
function TipItem({ Icon, text }: { Icon: React.ComponentType<any>; text: string }) {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.tipItem, { gap: spacing.md }]}>
      <View style={[styles.tipIconContainer, { backgroundColor: colors.background.muted, borderRadius: 8, padding: spacing.sm }]}>
        <Icon size={18} color={colors.text.secondary} strokeWidth={2} />
      </View>
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
  content: {
    flex: 1,
  },
  contentContainer: {},

  // Hero
  hero: {
    alignItems: 'center',
  },
  illustrationContainer: {},
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems: 'center',
  },
  tipIconContainer: {},
  tipText: {
    flex: 1,
  },

  // Footer
  footer: {},
});
