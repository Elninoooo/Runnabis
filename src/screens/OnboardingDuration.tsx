import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Zap, Calendar, Target, Mountain } from 'lucide-react-native';
import { Button, SelectCard } from '../components';
import { useTheme } from '../design-system';

// Options de durée du plan
const DURATION_OPTIONS: {
  weeks: number;
  icon: 'zap' | 'calendar' | 'target' | 'mountain';
  title: string;
  description: string;
}[] = [
  {
    weeks: 8,
    icon: 'zap',
    title: '8 semaines',
    description: 'Plan intensif pour les pressés',
  },
  {
    weeks: 10,
    icon: 'calendar',
    title: '10 semaines',
    description: 'Le classique, bien équilibré',
  },
  {
    weeks: 12,
    icon: 'target',
    title: '12 semaines',
    description: 'Recommandé • Progression optimale',
  },
  {
    weeks: 16,
    icon: 'mountain',
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
  const { colors, typography, spacing } = useTheme();
  const [selectedWeeks, setSelectedWeeks] = useState<number | null>(12); // 12 semaines par défaut

  const handleComplete = () => {
    if (selectedWeeks) {
      onComplete(selectedWeeks);
    }
  };

  const getIcon = (iconName: string, isSelected: boolean) => {
    const color = isSelected ? colors.accent.default : colors.text.secondary;
    const props = { size: 24, color, strokeWidth: 2 };

    switch (iconName) {
      case 'zap': return <Zap {...props} />;
      case 'calendar': return <Calendar {...props} />;
      case 'target': return <Target {...props} />;
      case 'mountain': return <Mountain {...props} />;
      default: return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.md }]}>
        <Text style={[
          styles.step,
          {
            fontSize: typography.fontSize.sm,
            color: colors.accent.default,
            fontWeight: typography.fontWeight.medium,
            marginBottom: spacing.xs,
          }
        ]}>
          Étape 4/4
        </Text>
        <Text style={[
          styles.title,
          {
            fontSize: typography.fontSize['3xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.text.primary,
            marginBottom: spacing.xs,
          }
        ]}>
          Durée du plan
        </Text>
        <Text style={[
          styles.subtitle,
          {
            fontSize: typography.fontSize.md,
            color: colors.text.secondary,
          }
        ]}>
          Sur combien de semaines veux-tu t'entraîner ?
        </Text>
      </View>

      {/* Options */}
      <View style={[styles.content, { padding: spacing.lg, gap: spacing.md }]}>
        {DURATION_OPTIONS.map((option) => (
          <SelectCard
            key={option.weeks}
            icon={getIcon(option.icon, selectedWeeks === option.weeks)}
            title={option.title}
            description={option.description}
            selected={selectedWeeks === option.weeks}
            onPress={() => setSelectedWeeks(option.weeks)}
          />
        ))}
      </View>

      {/* Footer */}
      <View style={[styles.footer, { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, paddingTop: spacing.md, gap: spacing.md }]}>
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
  },
  header: {},
  step: {},
  title: {},
  subtitle: {},
  content: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
  },
  continueButtonFull: {
    flex: 1,
  },
});
