import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button, SelectCard } from '../components';
import { colors, typography, spacing } from '../design-system';

// Options de durée du plan
const DURATION_OPTIONS: {
  weeks: number;
  emoji: string;
  title: string;
  description: string;
}[] = [
  {
    weeks: 8,
    emoji: '⚡',
    title: '8 semaines',
    description: 'Plan intensif pour les pressés',
  },
  {
    weeks: 10,
    emoji: '📅',
    title: '10 semaines',
    description: 'Le classique, bien équilibré',
  },
  {
    weeks: 12,
    emoji: '🎯',
    title: '12 semaines',
    description: 'Recommandé • Progression optimale',
  },
  {
    weeks: 16,
    emoji: '🏔️',
    title: '16 semaines',
    description: 'Pour bien se préparer, sans stress',
  },
];

interface OnboardingDurationProps {
  /** Appelée quand l'utilisateur termine l'onboarding */
  onComplete: (weeks: number) => void;
  /** Appelée pour revenir en arrière */
  onBack?: () => void;
}

export function OnboardingDuration({
  onComplete,
  onBack,
}: OnboardingDurationProps) {
  const [selectedWeeks, setSelectedWeeks] = useState<number | null>(12); // 12 semaines par défaut

  const handleComplete = () => {
    if (selectedWeeks) {
      onComplete(selectedWeeks);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.step}>Étape 4/4</Text>
        <Text style={styles.title}>Durée du plan</Text>
        <Text style={styles.subtitle}>
          Sur combien de semaines veux-tu t'entraîner ?
        </Text>
      </View>

      {/* Options */}
      <View style={styles.content}>
        {DURATION_OPTIONS.map((option) => (
          <SelectCard
            key={option.weeks}
            emoji={option.emoji}
            title={option.title}
            description={option.description}
            selected={selectedWeeks === option.weeks}
            onPress={() => setSelectedWeeks(option.weeks)}
          />
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {onBack && (
          <Button
            label="Retour"
            onPress={onBack}
            variant="ghost"
            size="lg"
          />
        )}
        <View style={onBack ? styles.continueButton : styles.continueButtonFull}>
          <Button
            label="Générer mon plan"
            onPress={handleComplete}
            size="lg"
            fullWidth
            disabled={!selectedWeeks}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[0],
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  step: {
    fontSize: typography.fontSize.sm,
    color: colors.primary[500],
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.neutral[600],
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  continueButton: {
    flex: 1,
  },
  continueButtonFull: {
    flex: 1,
  },
});
