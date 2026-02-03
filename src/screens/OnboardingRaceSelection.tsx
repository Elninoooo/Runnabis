import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Route, MapPin, Medal, Trophy } from 'lucide-react-native';
import { Button, SelectCard } from '../components';
import { useTheme } from '../design-system';
import { RaceType } from '../types';

// Configuration des courses disponibles
const RACE_OPTIONS: {
  type: RaceType;
  icon: 'route' | 'mapPin' | 'medal' | 'trophy';
  title: string;
  description: string;
}[] = [
  {
    type: '5K',
    icon: 'route',
    title: '5 kilomètres',
    description: 'Idéal pour débuter • ~25-35 min',
  },
  {
    type: '10K',
    icon: 'mapPin',
    title: '10 kilomètres',
    description: 'Le classique • ~45-60 min',
  },
  {
    type: 'semi-marathon',
    icon: 'medal',
    title: 'Semi-marathon',
    description: '21,1 km • ~1h45-2h30',
  },
  {
    type: 'marathon',
    icon: 'trophy',
    title: 'Marathon',
    description: '42,195 km • Le défi ultime',
  },
];

interface OnboardingRaceSelectionProps {
  /** Appelée quand l'utilisateur continue avec sa sélection */
  onContinue: (raceType: RaceType) => void;
  /** Appelée pour revenir en arrière */
  onBack?: () => void;
}

export function OnboardingRaceSelection({
  onContinue,
  onBack,
}: OnboardingRaceSelectionProps) {
  const { colors, typography, spacing } = useTheme();
  const [selectedRace, setSelectedRace] = useState<RaceType | null>(null);

  const handleContinue = () => {
    if (selectedRace) {
      onContinue(selectedRace);
    }
  };

  const getIcon = (iconName: string, isSelected: boolean) => {
    const color = isSelected ? colors.accent.default : colors.text.secondary;
    const props = { size: 24, color, strokeWidth: 2 };

    switch (iconName) {
      case 'route': return <Route {...props} />;
      case 'mapPin': return <MapPin {...props} />;
      case 'medal': return <Medal {...props} />;
      case 'trophy': return <Trophy {...props} />;
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
          Étape 1/4
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
          Quel est ton objectif ?
        </Text>
        <Text style={[
          styles.subtitle,
          {
            fontSize: typography.fontSize.md,
            color: colors.text.secondary,
          }
        ]}>
          Choisis la distance que tu veux préparer
        </Text>
      </View>

      {/* Options */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.options, { padding: spacing.lg, gap: spacing.md }]}
        showsVerticalScrollIndicator={false}
      >
        {RACE_OPTIONS.map((race) => (
          <SelectCard
            key={race.type}
            icon={getIcon(race.icon, selectedRace === race.type)}
            title={race.title}
            description={race.description}
            selected={selectedRace === race.type}
            onPress={() => setSelectedRace(race.type)}
          />
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, paddingTop: spacing.md }]}>
        <Button
          label="Continuer"
          onPress={handleContinue}
          size="lg"
          fullWidth
          disabled={!selectedRace}
        />
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
  options: {},
  footer: {},
});
