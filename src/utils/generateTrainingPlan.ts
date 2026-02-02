/**
 * Générateur de plan d'entraînement
 *
 * Crée un plan personnalisé basé sur le profil utilisateur.
 */

import {
  UserProfile,
  Workout,
  WorkoutType,
  TrainingPlan,
  DayOfWeek,
} from '../types';

// Descriptions des types d'entraînement
export const WORKOUT_INFO: Record<
  WorkoutType,
  { title: string; emoji: string; description: string; color: string }
> = {
  'endurance-fondamentale': {
    title: 'Endurance fondamentale',
    emoji: '🏃',
    description:
      'Course à allure confortable où tu peux tenir une conversation. C\'est la base de tout plan d\'entraînement, elle développe ton système aérobie.',
    color: '#4CAF50',
  },
  fractionne: {
    title: 'Fractionné',
    emoji: '⚡',
    description:
      'Alternance de périodes rapides et de récupération. Améliore ta VMA (vitesse maximale aérobie) et ta capacité à tenir un effort intense.',
    color: '#FF5722',
  },
  'allure-specifique': {
    title: 'Allure spécifique',
    emoji: '🎯',
    description:
      'Course à l\'allure que tu viseras le jour de la course. Ton corps apprend à être efficace à cette vitesse précise.',
    color: '#2196F3',
  },
  'sortie-longue': {
    title: 'Sortie longue',
    emoji: '🏔️',
    description:
      'La séance la plus longue de la semaine, à allure modérée. Développe ton endurance et ta résistance mentale.',
    color: '#9C27B0',
  },
  recuperation: {
    title: 'Récupération',
    emoji: '🧘',
    description:
      'Course très lente pour récupérer activement. Aide tes muscles à se régénérer entre les séances difficiles.',
    color: '#00BCD4',
  },
  repos: {
    title: 'Repos',
    emoji: '😴',
    description:
      'Jour de repos complet. Le repos fait partie de l\'entraînement, c\'est là que ton corps progresse !',
    color: '#9E9E9E',
  },
};

// Ordre des jours pour le tri
const DAY_ORDER: Record<DayOfWeek, number> = {
  lundi: 1,
  mardi: 2,
  mercredi: 3,
  jeudi: 4,
  vendredi: 5,
  samedi: 6,
  dimanche: 7,
};

/**
 * Génère un ID unique
 */
function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Calcule la durée d'une séance selon le type, la semaine et le niveau
 */
function getWorkoutDuration(
  type: WorkoutType,
  weekNumber: number,
  totalWeeks: number,
  level: UserProfile['level']
): number {
  // Progression : on augmente progressivement puis on réduit les 2 dernières semaines (affûtage)
  const progressionFactor =
    weekNumber <= totalWeeks - 2
      ? 1 + (weekNumber - 1) * 0.05 // +5% par semaine
      : 0.7; // Réduction pour l'affûtage

  // Durées de base selon le niveau
  const baseDurations: Record<UserProfile['level'], Record<WorkoutType, number>> = {
    debutant: {
      'endurance-fondamentale': 30,
      fractionne: 25,
      'allure-specifique': 30,
      'sortie-longue': 45,
      recuperation: 20,
      repos: 0,
    },
    intermediaire: {
      'endurance-fondamentale': 40,
      fractionne: 35,
      'allure-specifique': 40,
      'sortie-longue': 60,
      recuperation: 25,
      repos: 0,
    },
    avance: {
      'endurance-fondamentale': 50,
      fractionne: 45,
      'allure-specifique': 50,
      'sortie-longue': 90,
      recuperation: 30,
      repos: 0,
    },
  };

  const baseDuration = baseDurations[level][type];
  return Math.round(baseDuration * progressionFactor);
}

/**
 * Détermine les types de séances pour une semaine donnée
 */
function getWeekWorkoutTypes(
  frequency: number,
  weekNumber: number,
  totalWeeks: number
): WorkoutType[] {
  // Les 2 dernières semaines = affûtage (moins intense)
  const isAffutage = weekNumber > totalWeeks - 2;

  // Patterns selon la fréquence
  const patterns: Record<number, WorkoutType[]> = {
    2: ['endurance-fondamentale', 'sortie-longue'],
    3: ['endurance-fondamentale', 'fractionne', 'sortie-longue'],
    4: ['endurance-fondamentale', 'fractionne', 'allure-specifique', 'sortie-longue'],
    5: [
      'endurance-fondamentale',
      'fractionne',
      'recuperation',
      'allure-specifique',
      'sortie-longue',
    ],
    6: [
      'endurance-fondamentale',
      'fractionne',
      'recuperation',
      'allure-specifique',
      'endurance-fondamentale',
      'sortie-longue',
    ],
  };

  let types = patterns[frequency] || patterns[3];

  // Pendant l'affûtage, on remplace les séances intenses par de l'endurance
  if (isAffutage) {
    types = types.map((type) =>
      type === 'fractionne' ? 'endurance-fondamentale' : type
    );
  }

  return types;
}

/**
 * Génère le plan d'entraînement complet
 */
export function generateTrainingPlan(profile: UserProfile): TrainingPlan {
  const workouts: Workout[] = [];

  // Trier les jours disponibles dans l'ordre de la semaine
  const sortedDays = [...profile.availableDays].sort(
    (a, b) => DAY_ORDER[a] - DAY_ORDER[b]
  );

  // Date de début = aujourd'hui
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  // Trouver le prochain jour disponible
  const today = startDate.getDay(); // 0 = dimanche
  const todayAsDayOfWeek = Object.entries(DAY_ORDER).find(
    ([_, order]) => order === (today === 0 ? 7 : today)
  )?.[0] as DayOfWeek;

  // Générer les séances pour chaque semaine
  for (let week = 1; week <= profile.trainingWeeks; week++) {
    const workoutTypes = getWeekWorkoutTypes(
      profile.weeklyFrequency,
      week,
      profile.trainingWeeks
    );

    sortedDays.forEach((day, dayIndex) => {
      if (dayIndex >= workoutTypes.length) return;

      const type = workoutTypes[dayIndex];
      const info = WORKOUT_INFO[type];

      // Calculer la date
      const dayOffset = DAY_ORDER[day] - 1; // Lundi = 0
      const weekOffset = (week - 1) * 7;
      const workoutDate = new Date(startDate);
      workoutDate.setDate(startDate.getDate() + weekOffset + dayOffset);

      // Durée selon la progression
      const duration = getWorkoutDuration(
        type,
        week,
        profile.trainingWeeks,
        profile.level
      );

      workouts.push({
        id: generateId(),
        date: workoutDate,
        type,
        title: info.title,
        description: info.description,
        duration,
        completed: false,
      });
    });
  }

  // Date de fin
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + profile.trainingWeeks * 7);

  return {
    id: generateId(),
    userProfile: profile,
    workouts,
    createdAt: new Date(),
    startDate,
    endDate,
  };
}
