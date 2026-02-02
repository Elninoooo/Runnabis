import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Button, Checkbox, Stepper } from '../components';
import { colors, typography, spacing } from '../design-system';
import { DayOfWeek } from '../types';

// Jours de la semaine
const DAYS: { key: DayOfWeek; label: string }[] = [
  { key: 'lundi', label: 'Lundi' },
  { key: 'mardi', label: 'Mardi' },
  { key: 'mercredi', label: 'Mercredi' },
  { key: 'jeudi', label: 'Jeudi' },
  { key: 'vendredi', label: 'Vendredi' },
  { key: 'samedi', label: 'Samedi' },
  { key: 'dimanche', label: 'Dimanche' },
];

interface OnboardingFrequencyProps {
  /** Appelée quand l'utilisateur continue */
  onContinue: (frequency: number, days: DayOfWeek[]) => void;
  /** Appelée pour revenir en arrière */
  onBack?: () => void;
}

export function OnboardingFrequency({
  onContinue,
  onBack,
}: OnboardingFrequencyProps) {
  const [frequency, setFrequency] = useState(3);
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);

  const toggleDay = (day: DayOfWeek) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      }
      // Ne pas permettre plus de jours que la fréquence
      if (prev.length >= frequency) {
        return prev;
      }
      return [...prev, day];
    });
  };

  // Ajuster les jours sélectionnés si la fréquence diminue
  const handleFrequencyChange = (newFrequency: number) => {
    setFrequency(newFrequency);
    if (selectedDays.length > newFrequency) {
      setSelectedDays(selectedDays.slice(0, newFrequency));
    }
  };

  const handleContinue = () => {
    onContinue(frequency, selectedDays);
  };

  const isValid = selectedDays.length === frequency;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.step}>Étape 3/4</Text>
        <Text style={styles.title}>Ta disponibilité</Text>
        <Text style={styles.subtitle}>
          Combien de fois par semaine peux-tu courir ?
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stepper pour la fréquence */}
        <View style={styles.frequencySection}>
          <Stepper
            value={frequency}
            min={2}
            max={6}
            onChange={handleFrequencyChange}
            label="séances / semaine"
          />
        </View>

        {/* Sélection des jours */}
        <View style={styles.daysSection}>
          <Text style={styles.daysTitle}>
            Quels jours es-tu disponible ?
          </Text>
          <Text style={styles.daysSubtitle}>
            Sélectionne {frequency} jour{frequency > 1 ? 's' : ''}
            {selectedDays.length > 0 && ` (${selectedDays.length}/${frequency})`}
          </Text>

          <View style={styles.daysList}>
            {DAYS.map((day) => (
              <Checkbox
                key={day.key}
                label={day.label}
                checked={selectedDays.includes(day.key)}
                onToggle={() => toggleDay(day.key)}
                disabled={
                  !selectedDays.includes(day.key) &&
                  selectedDays.length >= frequency
                }
              />
            ))}
          </View>
        </View>
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
            disabled={!isValid}
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
  scrollContent: {
    padding: spacing.lg,
  },
  frequencySection: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  daysSection: {
    marginTop: spacing.lg,
  },
  daysTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
    marginBottom: spacing.xs,
  },
  daysSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
    marginBottom: spacing.md,
  },
  daysList: {
    gap: spacing.xs,
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
