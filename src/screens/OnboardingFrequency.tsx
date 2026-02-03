import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Button, Checkbox, Stepper } from '../components';
import { useTheme } from '../design-system';
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
  const { colors, typography, spacing } = useTheme();
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
          Étape 3/4
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
          Ta disponibilité
        </Text>
        <Text style={[
          styles.subtitle,
          {
            fontSize: typography.fontSize.md,
            color: colors.text.secondary,
          }
        ]}>
          Combien de fois par semaine peux-tu courir ?
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.scrollContent, { padding: spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Stepper pour la fréquence */}
        <View style={[styles.frequencySection, { paddingVertical: spacing.xl }]}>
          <Stepper
            value={frequency}
            min={2}
            max={6}
            onChange={handleFrequencyChange}
            label="séances / semaine"
          />
        </View>

        {/* Sélection des jours */}
        <View style={[styles.daysSection, { marginTop: spacing.lg }]}>
          <Text style={[
            styles.daysTitle,
            {
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              marginBottom: spacing.xs,
            }
          ]}>
            Quels jours es-tu disponible ?
          </Text>
          <Text style={[
            styles.daysSubtitle,
            {
              fontSize: typography.fontSize.sm,
              color: colors.text.secondary,
              marginBottom: spacing.md,
            }
          ]}>
            Sélectionne {frequency} jour{frequency > 1 ? 's' : ''}
            {selectedDays.length > 0 && ` (${selectedDays.length}/${frequency})`}
          </Text>

          <View style={[styles.daysList, { gap: spacing.xs }]}>
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
  },
  header: {},
  step: {},
  title: {},
  subtitle: {},
  content: {
    flex: 1,
  },
  scrollContent: {},
  frequencySection: {
    alignItems: 'center',
  },
  daysSection: {},
  daysTitle: {},
  daysSubtitle: {},
  daysList: {},
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
