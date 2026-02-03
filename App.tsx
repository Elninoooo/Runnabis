import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  OnboardingWelcome,
  OnboardingRaceSelection,
  OnboardingLevelSelection,
  OnboardingFrequency,
  OnboardingDuration,
  HomeScreen,
  WorkoutDetailScreen,
  SettingsScreen,
} from './src/screens';
import { ThemeProvider, useTheme } from './src/design-system';
import { RaceType, RunnerLevel, DayOfWeek, UserProfile, TrainingPlan, Workout } from './src/types';
import { generateTrainingPlan } from './src/utils';

// Les différentes étapes de l'app
type Screen =
  | 'welcome'
  | 'race-selection'
  | 'level-selection'
  | 'frequency'
  | 'duration'
  | 'home'
  | 'workout-detail'
  | 'settings';

function AppContent() {
  const { mode } = useTheme();

  // Navigation
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  // Données utilisateur collectées pendant l'onboarding
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({});

  // Plan d'entraînement généré
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlan | null>(null);

  // Séance sélectionnée pour le détail
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  // Handlers de navigation - Onboarding
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

    // Générer le plan d'entraînement
    const plan = generateTrainingPlan(completeProfile);
    setTrainingPlan(plan);
    setUserProfile(completeProfile);
    setCurrentScreen('home');
  };

  // Handlers retour - Onboarding
  const handleBackToRace = () => setCurrentScreen('race-selection');
  const handleBackToLevel = () => setCurrentScreen('level-selection');
  const handleBackToFrequency = () => setCurrentScreen('frequency');

  // Handlers - Home
  const handleWorkoutPress = (workout: Workout) => {
    setSelectedWorkout(workout);
    setCurrentScreen('workout-detail');
  };

  const handleToggleComplete = (workoutId: string) => {
    if (!trainingPlan) return;

    setTrainingPlan((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        workouts: prev.workouts.map((w) =>
          w.id === workoutId ? { ...w, completed: !w.completed } : w
        ),
      };
    });

    // Mettre à jour aussi selectedWorkout si c'est la même séance
    if (selectedWorkout?.id === workoutId) {
      setSelectedWorkout((prev) =>
        prev ? { ...prev, completed: !prev.completed } : prev
      );
    }
  };

  // Handlers - Settings
  const handleSettingsPress = () => {
    setCurrentScreen('settings');
  };

  const handleBackFromSettings = () => {
    setCurrentScreen('home');
  };

  const handleResetOnboarding = () => {
    setUserProfile({});
    setTrainingPlan(null);
    setSelectedWorkout(null);
    setCurrentScreen('welcome');
  };

  // Handlers - Workout Detail
  const handleBackToHome = () => {
    setSelectedWorkout(null);
    setCurrentScreen('home');
  };

  const handleToggleSelectedComplete = () => {
    if (selectedWorkout) {
      handleToggleComplete(selectedWorkout.id);
    }
  };

  return (
    <>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />

      {/* Onboarding */}
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

      {/* App principale */}
      {currentScreen === 'home' && trainingPlan && (
        <HomeScreen
          plan={trainingPlan}
          onWorkoutPress={handleWorkoutPress}
          onToggleComplete={handleToggleComplete}
          onSettingsPress={handleSettingsPress}
        />
      )}

      {currentScreen === 'workout-detail' && selectedWorkout && (
        <WorkoutDetailScreen
          workout={selectedWorkout}
          onBack={handleBackToHome}
          onToggleComplete={handleToggleSelectedComplete}
        />
      )}

      {currentScreen === 'settings' && trainingPlan && (
        <SettingsScreen
          profile={trainingPlan.userProfile}
          onBack={handleBackFromSettings}
          onResetOnboarding={handleResetOnboarding}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
