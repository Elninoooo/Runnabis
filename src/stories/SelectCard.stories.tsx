import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SelectCard } from '../components/SelectCard';

/**
 * # SelectCard
 *
 * Carte sélectionnable pour les choix uniques ou multiples.
 * **Supporte le Dark Mode** - utilise le sélecteur de background dans la toolbar.
 *
 * ## Utilisation
 * - Sélection de niveau (débutant, intermédiaire, expert)
 * - Choix de fréquence d'entraînement
 * - Options de personnalisation
 *
 * ## États
 * - Default : Fond surface, bordure default
 * - Selected : Bordure accent, fond légèrement teinté
 *
 * ## Tokens utilisés
 * - `colors.accent.default` : Bordure quand sélectionné
 * - `colors.accent.soft` : Fond quand sélectionné
 */
const meta: Meta<typeof SelectCard> = {
  title: 'Components/SelectCard',
  component: SelectCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'État sélectionné',
    },
    title: {
      control: 'text',
      description: 'Titre de la carte',
    },
    description: {
      control: 'text',
      description: 'Description optionnelle',
    },
    emoji: {
      control: 'text',
      description: 'Emoji optionnel (à remplacer par icônes)',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, width: 350 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SelectCard>;

export const Default: Story = {
  args: {
    title: 'Intermédiaire',
    description: 'Je cours régulièrement depuis quelques mois',
    selected: false,
    onPress: () => console.log('Pressed'),
  },
};

export const Selected: Story = {
  args: {
    title: 'Intermédiaire',
    description: 'Je cours régulièrement depuis quelques mois',
    selected: true,
    onPress: () => console.log('Pressed'),
  },
};

export const WithoutDescription: Story = {
  args: {
    title: '3 fois par semaine',
    selected: false,
    onPress: () => console.log('Pressed'),
  },
};

export const LevelSelection: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <SelectCard
        title="Débutant"
        description="Je débute ou reprends la course"
        selected={false}
        onPress={() => {}}
      />
      <SelectCard
        title="Intermédiaire"
        description="Je cours régulièrement depuis quelques mois"
        selected={true}
        onPress={() => {}}
      />
      <SelectCard
        title="Confirmé"
        description="Je cours depuis plusieurs années"
        selected={false}
        onPress={() => {}}
      />
    </View>
  ),
};

export const FrequencySelection: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <SelectCard
        title="2 fois par semaine"
        selected={false}
        onPress={() => {}}
      />
      <SelectCard
        title="3 fois par semaine"
        selected={true}
        onPress={() => {}}
      />
      <SelectCard
        title="4 fois par semaine"
        selected={false}
        onPress={() => {}}
      />
      <SelectCard
        title="5 fois ou plus"
        selected={false}
        onPress={() => {}}
      />
    </View>
  ),
};
