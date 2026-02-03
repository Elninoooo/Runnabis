import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { WorkoutCard } from '../../src/components';
import { Workout } from '../../src/types';

/**
 * # WorkoutCard
 *
 * Affiche une séance d'entraînement.
 *
 * ## Variants
 * - Mode normal : Affiche toutes les infos
 * - Mode compact : Juste l'emoji et la durée
 *
 * ## États
 * - Non complété : Style normal
 * - Complété : Barré et opacité réduite
 *
 * ## Tokens utilisés
 * - `colors` dynamiques selon le type de workout
 * - `shadows.sm` : Ombre de la carte
 * - `borderRadius.lg` : Arrondi
 * - `spacing.md` : Padding interne
 */
const meta: Meta<typeof WorkoutCard> = {
  title: 'Components/WorkoutCard',
  component: WorkoutCard,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, gap: 12 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    compact: {
      control: 'boolean',
      description: 'Mode compact',
    },
  },
};

export default meta;
type Story = StoryObj<typeof WorkoutCard>;

const createWorkout = (
  type: Workout['type'],
  completed: boolean = false
): Workout => ({
  id: '1',
  date: new Date(),
  type,
  title: type,
  description: 'Description de la séance',
  duration: 45,
  completed,
});

export const EnduranceFondamentale: Story = {
  args: {
    workout: createWorkout('endurance-fondamentale'),
    onPress: () => console.log('Pressed!'),
  },
};

export const Fractionne: Story = {
  args: {
    workout: createWorkout('fractionne'),
    onPress: () => console.log('Pressed!'),
  },
};

export const SortieLongue: Story = {
  args: {
    workout: createWorkout('sortie-longue'),
    onPress: () => console.log('Pressed!'),
  },
};

export const AllureSpecifique: Story = {
  args: {
    workout: createWorkout('allure-specifique'),
    onPress: () => console.log('Pressed!'),
  },
};

export const Recuperation: Story = {
  args: {
    workout: createWorkout('recuperation'),
    onPress: () => console.log('Pressed!'),
  },
};

export const Completed: Story = {
  args: {
    workout: createWorkout('endurance-fondamentale', true),
    onPress: () => console.log('Pressed!'),
  },
};

export const Compact: Story = {
  args: {
    workout: createWorkout('fractionne'),
    compact: true,
    onPress: () => console.log('Pressed!'),
  },
};

// Liste de séances
export const WorkoutList: Story = {
  render: () => {
    const workouts: Workout[] = [
      createWorkout('endurance-fondamentale'),
      createWorkout('fractionne'),
      createWorkout('sortie-longue', true),
    ];

    return (
      <View style={{ gap: 12 }}>
        {workouts.map((w, i) => (
          <WorkoutCard
            key={i}
            workout={w}
            onPress={() => console.log('Pressed:', w.type)}
          />
        ))}
      </View>
    );
  },
};
