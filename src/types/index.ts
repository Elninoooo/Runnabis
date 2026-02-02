/**
 * Types de l'application Runnabis
 *
 * Ce fichier définit les structures de données utilisées dans l'app.
 */

// Types de course disponibles
export type RaceType = '5K' | '10K' | 'semi-marathon' | 'marathon';

// Niveau du coureur
export type RunnerLevel = 'debutant' | 'intermediaire' | 'avance';

// Jours de la semaine
export type DayOfWeek =
  | 'lundi'
  | 'mardi'
  | 'mercredi'
  | 'jeudi'
  | 'vendredi'
  | 'samedi'
  | 'dimanche';

// Types d'entraînement
export type WorkoutType =
  | 'endurance-fondamentale' // EF - Course lente, base aérobie
  | 'fractionne'             // Intervalles rapides/lents
  | 'allure-specifique'      // À l'allure de course visée
  | 'sortie-longue'          // Longue distance, rythme modéré
  | 'recuperation'           // Très lent, récupération active
  | 'repos';                 // Jour de repos

// Profil utilisateur (données de l'onboarding)
export interface UserProfile {
  raceType: RaceType;
  level: RunnerLevel;
  weeklyFrequency: number;        // Nombre de séances par semaine
  availableDays: DayOfWeek[];     // Jours disponibles
  trainingWeeks: number;          // Nombre de semaines de préparation
  raceDate?: Date;                // Date de la course (optionnel)
}

// Une séance d'entraînement
export interface Workout {
  id: string;
  date: Date;
  type: WorkoutType;
  title: string;
  description: string;
  duration: number;               // Durée en minutes
  distance?: number;              // Distance en km (optionnel)
  completed: boolean;
}

// Plan d'entraînement complet
export interface TrainingPlan {
  id: string;
  userProfile: UserProfile;
  workouts: Workout[];
  createdAt: Date;
  startDate: Date;
  endDate: Date;
}
