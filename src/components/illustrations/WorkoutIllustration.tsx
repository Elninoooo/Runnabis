import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { WorkoutType } from '../../types';
import { useTheme } from '../../design-system';

interface WorkoutIllustrationProps {
  /** Type d'entraînement */
  type: WorkoutType;
  /** Taille de l'illustration */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * WorkoutIllustration - Illustrations pour les types d'entraînement
 *
 * Style : Flat, géométrique, silhouettes de coureurs
 * Couleurs : Utilise les couleurs du thème
 */
export function WorkoutIllustration({ type, size = 'md' }: WorkoutIllustrationProps) {
  const { colors } = useTheme();

  const sizeMap = {
    sm: 40,
    md: 56,
    lg: 80,
  };

  const dimension = sizeMap[size];

  // Couleurs par type d'entraînement
  const workoutColors: Record<WorkoutType, { bg: string; accent: string }> = {
    'endurance-fondamentale': {
      bg: colors.workout.endurance,
      accent: '#5A9E7C',
    },
    'fractionne': {
      bg: colors.workout.fractionne,
      accent: '#D4726A',
    },
    'allure-specifique': {
      bg: colors.workout.allure,
      accent: '#6A7ED4',
    },
    'sortie-longue': {
      bg: colors.workout.sortieLongue,
      accent: '#B5A66A',
    },
    'recuperation': {
      bg: colors.workout.recuperation,
      accent: '#9A7EB5',
    },
    'repos': {
      bg: colors.background.muted,
      accent: colors.text.muted,
    },
  };

  const colorScheme = workoutColors[type];

  return (
    <View style={[styles.container, { width: dimension, height: dimension, backgroundColor: colorScheme.bg, borderRadius: dimension / 4 }]}>
      <Svg width={dimension * 0.6} height={dimension * 0.6} viewBox="0 0 24 24">
        {type === 'endurance-fondamentale' && (
          // Coureur en mouvement fluide
          <G>
            <Circle cx="12" cy="5" r="2.5" fill={colorScheme.accent} />
            <Path
              d="M15 9l-2 2-2-2-3 3v2l3-2 2 2 2-3 3 2v-2l-3-2z"
              fill={colorScheme.accent}
            />
            <Path
              d="M9 17l2-3 2 2 2-2 2 3"
              stroke={colorScheme.accent}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </G>
        )}

        {type === 'fractionne' && (
          // Éclair / vitesse
          <G>
            <Path
              d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
              fill={colorScheme.accent}
            />
          </G>
        )}

        {type === 'allure-specifique' && (
          // Chronomètre
          <G>
            <Circle cx="12" cy="13" r="8" stroke={colorScheme.accent} strokeWidth="2" fill="none" />
            <Path d="M12 9v5l3 2" stroke={colorScheme.accent} strokeWidth="2" strokeLinecap="round" fill="none" />
            <Path d="M10 2h4M12 2v3" stroke={colorScheme.accent} strokeWidth="2" strokeLinecap="round" />
          </G>
        )}

        {type === 'sortie-longue' && (
          // Route / chemin long
          <G>
            <Path
              d="M4 20c2-4 4-6 8-8s6-6 8-10"
              stroke={colorScheme.accent}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <Circle cx="18" cy="6" r="2" fill={colorScheme.accent} />
          </G>
        )}

        {type === 'recuperation' && (
          // Vagues calmes
          <G>
            <Path
              d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"
              stroke={colorScheme.accent}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"
              stroke={colorScheme.accent}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity={0.5}
            />
          </G>
        )}

        {type === 'repos' && (
          // Lune / nuit
          <G>
            <Path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill={colorScheme.accent}
            />
          </G>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
