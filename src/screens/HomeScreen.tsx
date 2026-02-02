import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { WorkoutCard } from '../components';
import { colors, typography, spacing, borderRadius } from '../design-system';
import { TrainingPlan, Workout } from '../types';

interface HomeScreenProps {
  /** Le plan d'entraînement */
  plan: TrainingPlan;
  /** Appelée quand on clique sur une séance */
  onWorkoutPress: (workout: Workout) => void;
  /** Appelée pour marquer une séance comme faite */
  onToggleComplete: (workoutId: string) => void;
}

/**
 * HomeScreen - Écran principal avec le calendrier
 */
export function HomeScreen({
  plan,
  onWorkoutPress,
  onToggleComplete,
}: HomeScreenProps) {
  const [selectedWeek, setSelectedWeek] = useState(1);

  // Calculer le nombre de semaines
  const totalWeeks = plan.userProfile.trainingWeeks;

  // Grouper les séances par semaine
  const workoutsByWeek = useMemo(() => {
    const grouped: Record<number, Workout[]> = {};

    plan.workouts.forEach((workout) => {
      const workoutDate = new Date(workout.date);
      const startDate = new Date(plan.startDate);
      const diffTime = workoutDate.getTime() - startDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const week = Math.floor(diffDays / 7) + 1;

      if (!grouped[week]) {
        grouped[week] = [];
      }
      grouped[week].push(workout);
    });

    return grouped;
  }, [plan]);

  // Séances de la semaine sélectionnée
  const currentWeekWorkouts = workoutsByWeek[selectedWeek] || [];

  // Stats de la semaine
  const weekStats = useMemo(() => {
    const total = currentWeekWorkouts.length;
    const completed = currentWeekWorkouts.filter((w) => w.completed).length;
    const totalDuration = currentWeekWorkouts.reduce((sum, w) => sum + w.duration, 0);
    return { total, completed, totalDuration };
  }, [currentWeekWorkouts]);

  // Stats globales
  const globalStats = useMemo(() => {
    const total = plan.workouts.length;
    const completed = plan.workouts.filter((w) => w.completed).length;
    return { total, completed, percentage: Math.round((completed / total) * 100) };
  }, [plan.workouts]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Ton plan</Text>
          <Text style={styles.title}>
            {plan.userProfile.raceType === 'semi-marathon'
              ? 'Semi-marathon'
              : plan.userProfile.raceType}
          </Text>
        </View>

        {/* Progress global */}
        <View style={styles.progressBadge}>
          <Text style={styles.progressText}>{globalStats.percentage}%</Text>
        </View>
      </View>

      {/* Sélecteur de semaine */}
      <View style={styles.weekSelectorContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekSelector}
        >
          {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((week) => {
            const weekWorkouts = workoutsByWeek[week] || [];
            const weekCompleted = weekWorkouts.filter((w) => w.completed).length;
            const weekTotal = weekWorkouts.length;
            const isComplete = weekCompleted === weekTotal && weekTotal > 0;

            return (
              <TouchableOpacity
                key={week}
                style={[
                  styles.weekButton,
                  selectedWeek === week && styles.weekButtonActive,
                  isComplete && styles.weekButtonComplete,
                ]}
                onPress={() => setSelectedWeek(week)}
              >
                <Text
                  style={[
                    styles.weekButtonText,
                    selectedWeek === week && styles.weekButtonTextActive,
                  ]}
                >
                  S{week}
                </Text>
                {weekTotal > 0 && (
                  <Text
                    style={[
                      styles.weekProgress,
                      selectedWeek === week && styles.weekProgressActive,
                    ]}
                  >
                    {weekCompleted}/{weekTotal}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Stats de la semaine */}
      <View style={styles.weekStats}>
        <Text style={styles.weekStatsTitle}>Semaine {selectedWeek}</Text>
        <Text style={styles.weekStatsSubtitle}>
          {weekStats.completed}/{weekStats.total} séances • {weekStats.totalDuration} min
        </Text>
      </View>

      {/* Liste des séances */}
      <ScrollView
        style={styles.workoutsList}
        contentContainerStyle={styles.workoutsContent}
        showsVerticalScrollIndicator={false}
      >
        {currentWeekWorkouts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text style={styles.emptyText}>Aucune séance cette semaine</Text>
          </View>
        ) : (
          currentWeekWorkouts.map((workout) => (
            <TouchableOpacity
              key={workout.id}
              onLongPress={() => onToggleComplete(workout.id)}
              delayLongPress={300}
            >
              <WorkoutCard
                workout={workout}
                onPress={() => onWorkoutPress(workout)}
              />
            </TouchableOpacity>
          ))
        )}

        {/* Tip */}
        {currentWeekWorkouts.length > 0 && (
          <Text style={styles.tip}>
            💡 Appui long sur une séance pour la marquer comme terminée
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.neutral[0],
  },
  greeting: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  progressBadge: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  progressText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[0],
  },

  // Week selector
  weekSelectorContainer: {
    backgroundColor: colors.neutral[0],
    paddingBottom: spacing.md,
  },
  weekSelector: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  weekButton: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral[100],
    minWidth: 56,
  },
  weekButtonActive: {
    backgroundColor: colors.primary[500],
  },
  weekButtonComplete: {
    backgroundColor: colors.primary[100],
  },
  weekButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[700],
  },
  weekButtonTextActive: {
    color: colors.neutral[0],
  },
  weekProgress: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[500],
    marginTop: 2,
  },
  weekProgressActive: {
    color: colors.primary[100],
  },

  // Week stats
  weekStats: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  weekStatsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
  },
  weekStatsSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
    marginTop: 2,
  },

  // Workouts list
  workoutsList: {
    flex: 1,
  },
  workoutsContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    color: colors.neutral[500],
  },

  // Tip
  tip: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    textAlign: 'center',
    marginTop: spacing.md,
    fontStyle: 'italic',
  },
});
