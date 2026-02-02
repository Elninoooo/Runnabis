import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { OnboardingWelcome, OnboardingRaceSelection } from './src/screens';
import { RaceType } from './src/types';

// Les différentes étapes de l'app
type Screen = 'welcome' | 'race-selection' | 'home';

export default function App() {
  // État pour savoir sur quel écran on est
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  // État pour stocker les choix de l'utilisateur
  const [selectedRace, setSelectedRace] = useState<RaceType | null>(null);

  // Navigation simple entre les écrans
  const handleGetStarted = () => {
    setCurrentScreen('race-selection');
  };

  const handleRaceSelected = (raceType: RaceType) => {
    setSelectedRace(raceType);
    console.log('Course sélectionnée:', raceType);
    // Pour l'instant on reste sur cet écran
    // Plus tard on ira vers l'écran suivant (level-selection)
  };

  return (
    <>
      <StatusBar style="dark" />

      {currentScreen === 'welcome' && (
        <OnboardingWelcome onGetStarted={handleGetStarted} />
      )}

      {currentScreen === 'race-selection' && (
        <OnboardingRaceSelection onContinue={handleRaceSelected} />
      )}
    </>
  );
}
