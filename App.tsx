import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import {
  OnboardingWelcome,
  OnboardingRaceSelection,
  OnboardingLevelSelection,
  OnboardingFrequency,
  OnboardingDuration,
} from './src/screens';
import { RaceType, RunnerLevel, DayOfWeek, UserProfile } from './src/types';
import { colors, typography, spacing } from './src/design-system';

// Les différentes étapes de l'app
type Screen =
  | 'welcome'
  | 'race-selection'
  | 'level-selection'
  | 'frequency'
  | 'duration'
  | 'home';

export default function App() {
  // Navigation
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  // Données utilisateur collectées pendant l'onboarding
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({});

  // Handlers de navigation
  const handleGetStarted = () => {
    setCurrentScreen('race-selection');
  };

  const handleRaceSelected = (raceType: RaceType) => {
    setUserProfile((prev) => ({ ...prev, raceType }));
    setCurrentScreen('level-selection');
  };

  const handleLevelSelected = (level: RunnerLevel) => {
    setUserProfile((prev) => ({ ...prev, level }));
    setCurrentScreen('frequency');
  };

  const handleFrequencySelected = (weeklyFrequency: number, availableDays: DayOfWeek[]) => {
    setUserProfile((prev) => ({ ...prev, weeklyFrequency, availableDays }));
    setCurrentScreen('duration');
  };

  const handleDurationSelected = (trainingWeeks: number) => {
    const completeProfile: UserProfile = {
      raceType: userProfile.raceType!,
      level: userProfile.level!,
      weeklyFrequency: userProfile.weeklyFrequency!,
      availableDays: userProfile.availableDays!,
      trainingWeeks,
    };
    setUserProfile(completeProfile);
    console.log('Profil complet:', completeProfile);
    setCurrentScreen('home');
  };

  // Handlers retour
  const handleBackToRace = () => setCurrentScreen('race-selection');
  const handleBackToLevel = () => setCurrentScreen('level-selection');
  const handleBackToFrequency = () => setCurrentScreen('frequency');

  return (
    <>
      <StatusBar style="dark" />

      {currentScreen === 'welcome' && (
        <OnboardingWelcome onGetStarted={handleGetStarted} />
      )}

      {currentScreen === 'race-selection' && (
        <OnboardingRaceSelection onContinue={handleRaceSelected} />
      )}

      {currentScreen === 'level-selection' && (
        <OnboardingLevelSelection
          onContinue={handleLevelSelected}
          onBack={handleBackToRace}
        />
      )}

      {currentScreen === 'frequency' && (
        <OnboardingFrequency
          onContinue={handleFrequencySelected}
          onBack={handleBackToLevel}
        />
      )}

      {currentScreen === 'duration' && (
        <OnboardingDuration
          onComplete={handleDurationSelected}
          onBack={handleBackToFrequency}
        />
      )}

      {currentScreen === 'home' && (
        <View style={styles.homeContainer}>
          <Text style={styles.homeEmoji}>🎉</Text>
          <Text style={styles.homeTitle}>C'est parti !</Text>
          <Text style={styles.homeSubtitle}>
            Ton plan de {userProfile.trainingWeeks} semaines pour le{' '}
            {userProfile.raceType} est prêt.
          </Text>
          <Text style={styles.homeDetails}>
            {userProfile.weeklyFrequency} séances/semaine • Niveau{' '}
            {userProfile.level}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[0],
    padding: spacing.lg,
  },
  homeEmoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  homeTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary[500],
    marginBottom: spacing.sm,
  },
  homeSubtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.neutral[700],
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  homeDetails: {
    fontSize: typography.fontSize.md,
    color: colors.neutral[500],
  },
});
