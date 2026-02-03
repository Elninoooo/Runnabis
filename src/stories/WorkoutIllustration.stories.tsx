import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { WorkoutIllustration } from '../components/illustrations';
import { useTheme } from '../design-system';
import { WorkoutType } from '../types';

/**
 * # WorkoutIllustration
 *
 * Illustrations SVG colorées pour les types de séances d'entraînement.
 * **Supporte le Dark Mode** - les couleurs sont les mêmes en light/dark.
 *
 * ## Types de workout
 * - `endurance-fondamentale` : Vert (#4CAF50) - Course lente de base
 * - `fractionne` : Orange (#FF9800) - Intervalles rapides
 * - `sortie-longue` : Bleu (#2196F3) - Longue distance
 * - `allure-specifique` : Violet (#9C27B0) - Allure cible
 * - `recuperation` : Cyan (#00BCD4) - Course légère
 * - `repos` : Gris (#9E9E9E) - Jour de repos
 *
 * ## Tailles
 * - `sm` : 40x40px
 * - `md` : 64x64px (default)
 * - `lg` : 96x96px
 *
 * ## Utilisation
 * - WorkoutCard : taille md
 * - WorkoutDetailScreen : taille lg
 * - Listes compactes : taille sm
 *
 * ## Notes
 * - Utilisé à la place des emojis (guidelines: "JAMAIS d'emojis")
 * - Chaque type a une couleur distincte pour identification rapide
 * - Les illustrations sont des icônes stylisées (running, intervals, etc.)
 */
const meta: Meta<typeof WorkoutIllustration> = {
  title: 'Components/WorkoutIllustration',
  component: WorkoutIllustration,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['endurance-fondamentale', 'fractionne', 'sortie-longue', 'allure-specifique', 'recuperation', 'repos'],
      description: 'Type de workout',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille de l\'illustration',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WorkoutIllustration>;

export const EnduranceFondamentale: Story = {
  args: {
    type: 'endurance-fondamentale',
    size: 'md',
  },
};

export const Fractionne: Story = {
  args: {
    type: 'fractionne',
    size: 'md',
  },
};

export const SortieLongue: Story = {
  args: {
    type: 'sortie-longue',
    size: 'md',
  },
};

export const AllureSpecifique: Story = {
  args: {
    type: 'allure-specifique',
    size: 'md',
  },
};

export const Recuperation: Story = {
  args: {
    type: 'recuperation',
    size: 'md',
  },
};

export const Repos: Story = {
  args: {
    type: 'repos',
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <WorkoutIllustration type="endurance-fondamentale" size="sm" />
        <Text style={{ fontSize: 12, color: '#666' }}>sm (40px)</Text>
      </View>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <WorkoutIllustration type="endurance-fondamentale" size="md" />
        <Text style={{ fontSize: 12, color: '#666' }}>md (64px)</Text>
      </View>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <WorkoutIllustration type="endurance-fondamentale" size="lg" />
        <Text style={{ fontSize: 12, color: '#666' }}>lg (96px)</Text>
      </View>
    </View>
  ),
};

export const AllTypes: Story = {
  render: function Render() {
    const { colors, typography, spacing } = useTheme();
    const types: { type: WorkoutType; label: string }[] = [
      { type: 'endurance-fondamentale', label: 'Endurance' },
      { type: 'fractionne', label: 'Fractionné' },
      { type: 'sortie-longue', label: 'Sortie longue' },
      { type: 'allure-specifique', label: 'Allure spé.' },
      { type: 'recuperation', label: 'Récupération' },
      { type: 'repos', label: 'Repos' },
    ];

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
        {types.map(({ type, label }) => (
          <View key={type} style={{ alignItems: 'center', gap: 8, width: 80 }}>
            <WorkoutIllustration type={type} size="md" />
            <Text style={{
              fontSize: typography.fontSize.xs,
              color: colors.text.secondary,
              textAlign: 'center'
            }}>
              {label}
            </Text>
          </View>
        ))}
      </View>
    );
  },
};

export const InContext: Story = {
  render: function Render() {
    const { colors, typography, spacing, borderRadius } = useTheme();

    return (
      <View style={{
        backgroundColor: colors.background.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        width: 320,
      }}>
        <WorkoutIllustration type="fractionne" size="md" />
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: typography.fontSize.md,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
          }}>
            Fractionné
          </Text>
          <Text style={{
            fontSize: typography.fontSize.sm,
            color: colors.text.secondary,
            marginTop: 2,
          }}>
            45 min • Mardi
          </Text>
        </View>
      </View>
    );
  },
};
