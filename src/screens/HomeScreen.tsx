import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Settings, Calendar, Lightbulb } from 'lucide-react-native';
import { WorkoutCard, IconButton } from '../components';
import { useTheme } from '../design-system';
import { TrainingPlan, Workout } from '../types';

interface HomeScreenProps {
  /** Le plan d'entraînement */
  plan: TrainingPlan;
  /** Appelée quand on clique sur une séance */
  onWorkoutPress: (workout: Workout) => void;
  /** Appelée pour marquer une séance comme faite */
  onToggleComplete: (workoutId: string) => void;
  /** Appelée pour ouvrir les paramètres */
  onSettingsPress?: () => void;
}

/**
 * HomeScreen - Écran principal avec le calendrier
 */
export function HomeScreen({
  plan,
  onWorkoutPress,
  onToggleComplete,
  onSettingsPress,
}: HomeScreenProps) {
  const { colors, typography, spacing, borderRadius } = useTheme();
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.muted }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md, backgroundColor: colors.background.primary }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.greeting, { fontSize: typography.fontSize.sm, color: colors.text.muted }]}>
            Ton plan
          </Text>
          <Text style={[styles.title, { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.text.primary }]}>
            {plan.userProfile.raceType === 'semi-marathon'
              ? 'Semi-marathon'
              : plan.userProfile.raceType}
          </Text>
        </View>

        <View style={styles.headerRight}>
          {/* Progress global */}
          <View style={[styles.progressBadge, { backgroundColor: colors.accent.default, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full }]}>
            <Text style={[styles.progressText, { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.bold, color: colors.text.inverse }]}>
              {globalStats.percentage}%
            </Text>
          </View>

          {/* Settings button */}
          {onSettingsPress && (
            <IconButton
              icon={<Settings size={20} color={colors.text.secondary} strokeWidth={2} />}
              onPress={onSettingsPress}
              variant="ghost"
              size="md"
              style={{ marginLeft: spacing.sm }}
            />
          )}
        </View>
      </View>

      {/* Sélecteur de semaine */}
      <View style={[styles.weekSelectorContainer, { backgroundColor: colors.background.primary, paddingBottom: spacing.md }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.weekSelector, { paddingHorizontal: spacing.lg, gap: spacing.sm }]}
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
                  {
                    paddingHorizontal: spacing.md,
                    paddingVertical: spacing.sm,
                    borderRadius: borderRadius.lg,
                    backgroundColor: selectedWeek === week
                      ? colors.accent.default
                      : isComplete
                        ? colors.accent.soft
                        : colors.background.muted,
                    minWidth: 56,
                  },
                ]}
                onPress={() => setSelectedWeek(week)}
              >
                <Text
                  style={[
                    styles.weekButtonText,
                    {
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.semibold,
                      color: selectedWeek === week ? colors.text.inverse : colors.text.secondary,
                    },
                  ]}
                >
                  S{week}
                </Text>
                {weekTotal > 0 && (
                  <Text
                    style={[
                      styles.weekProgress,
                      {
                        fontSize: typography.fontSize.xs,
                        color: selectedWeek === week ? colors.accent.soft : colors.text.muted,
                        marginTop: 2,
                      },
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
      <View style={[styles.weekStats, { paddingHorizontal: spacing.lg, paddingVertical: spacing.md }]}>
        <Text style={[styles.weekStatsTitle, { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, color: colors.text.primary }]}>
          Semaine {selectedWeek}
        </Text>
        <Text style={[styles.weekStatsSubtitle, { fontSize: typography.fontSize.sm, color: colors.text.secondary, marginTop: 2 }]}>
          {weekStats.completed}/{weekStats.total} séances • {weekStats.totalDuration} min
        </Text>
      </View>

      {/* Liste des séances */}
      <ScrollView
        style={styles.workoutsList}
        contentContainerStyle={[styles.workoutsContent, { padding: spacing.lg, gap: spacing.md }]}
        showsVerticalScrollIndicator={false}
      >
        {currentWeekWorkouts.length === 0 ? (
          <View style={[styles.emptyState, { paddingVertical: spacing['2xl'] }]}>
            <View style={[styles.emptyIcon, { marginBottom: spacing.md }]}>
              <Calendar size={48} color={colors.text.muted} strokeWidth={1.5} />
            </View>
            <Text style={[styles.emptyText, { fontSize: typography.fontSize.md, color: colors.text.muted }]}>
              Aucune séance cette semaine
            </Text>
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
          <View style={[styles.tipContainer, { marginTop: spacing.md, gap: spacing.xs }]}>
            <Lightbulb size={14} color={colors.text.muted} strokeWidth={2} />
            <Text style={[styles.tip, { fontSize: typography.fontSize.sm, color: colors.text.muted }]}>
              Appui long sur une séance pour la marquer comme terminée
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {},
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {},
  title: {},
  progressBadge: {},
  progressText: {},
  settingsButton: {},

  // Week selector
  weekSelectorContainer: {},
  weekSelector: {},
  weekButton: {
    alignItems: 'center',
  },
  weekButtonText: {},
  weekProgress: {},

  // Week stats
  weekStats: {},
  weekStatsTitle: {},
  weekStatsSubtitle: {},

  // Workouts list
  workoutsList: {
    flex: 1,
  },
  workoutsContent: {},

  // Empty state
  emptyState: {
    alignItems: 'center',
  },
  emptyIcon: {},
  emptyText: {},

  // Tip
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tip: {
    fontStyle: 'italic',
  },
});
