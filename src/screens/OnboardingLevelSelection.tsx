import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Button, SelectCard } from '../components';
import { colors, typography, spacing } from '../design-system';
import { RunnerLevel } from '../types';

// Configuration des niveaux disponibles
const LEVEL_OPTIONS: {
  level: RunnerLevel;
  emoji: string;
  title: string;
  description: string;
}[] = [
  {
    level: 'debutant',
    emoji: '🌱',
    title: 'Débutant',
    description: 'Je débute ou reprends la course à pied',
  },
  {
    level: 'intermediaire',
    emoji: '💪',
    title: 'Intermédiaire',
    description: 'Je cours régulièrement depuis quelques mois',
  },
  {
    level: 'avance',
    emoji: '🔥',
    title: 'Avancé',
    description: 'Je cours depuis plus d\'un an, j\'ai déjà fait des courses',
  },
];

interface OnboardingLevelSelectionProps {
  /** Appelée quand l'utilisateur continue avec sa sélection */
  onContinue: (level: RunnerLevel) => void;
  /** Appelée pour revenir en arrière */
  onBack?: () => void;
}

export function OnboardingLevelSelection({
  onContinue,
  onBack,
}: OnboardingLevelSelectionProps) {
  const [selectedLevel, setSelectedLevel] = useState<RunnerLevel | null>(null);

  const handleContinue = () => {
    if (selectedLevel) {
      onContinue(selectedLevel);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.step}>Étape 2/4</Text>
        <Text style={styles.title}>Quel est ton niveau ?</Text>
        <Text style={styles.subtitle}>
          On adaptera le plan à ton expérience
        </Text>
      </View>

      {/* Options */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.options}
        showsVerticalScrollIndicator={false}
      >
        {LEVEL_OPTIONS.map((option) => (
          <SelectCard
            key={option.level}
            emoji={option.emoji}
            title={option.title}
            description={option.description}
            selected={selectedLevel === option.level}
            onPress={() => setSelectedLevel(option.level)}
          />
        ))}
      </ScrollView>

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
            label="Continuer"
            onPress={handleContinue}
            size="lg"
            fullWidth
            disabled={!selectedLevel}
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
  },
  options: {
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
