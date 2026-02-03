import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { useState } from 'react';
import { SelectCard } from '../../src/components';

/**
 * # SelectCard
 *
 * Carte de sélection pour les choix uniques (radio).
 *
 * ## Usage
 * Utilisé dans l'onboarding pour :
 * - Choix du type de course
 * - Choix du niveau
 * - Choix de la durée du plan
 *
 * ## Tokens utilisés
 * - `colors.primary[500]` : Bordure sélectionnée
 * - `colors.primary[50]` : Fond sélectionné
 * - `colors.neutral[200]` : Bordure non sélectionnée
 * - `borderRadius.lg` : Arrondi de la carte
 * - `spacing.md` : Padding et gaps
 */
const meta: Meta<typeof SelectCard> = {
  title: 'Components/SelectCard',
  component: SelectCard,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    emoji: {
      control: 'text',
      description: 'Emoji affiché',
    },
    title: {
      control: 'text',
      description: 'Titre principal',
    },
    description: {
      control: 'text',
      description: 'Description optionnelle',
    },
    selected: {
      control: 'boolean',
      description: 'État sélectionné',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectCard>;

export const Default: Story = {
  args: {
    emoji: '🏃',
    title: '5 kilomètres',
    description: 'Idéal pour débuter • ~25-35 min',
    selected: false,
    onPress: () => console.log('Pressed!'),
  },
};

export const Selected: Story = {
  args: {
    emoji: '🏅',
    title: 'Semi-marathon',
    description: '21,1 km • ~1h45-2h30',
    selected: true,
    onPress: () => console.log('Pressed!'),
  },
};

export const WithoutDescription: Story = {
  args: {
    emoji: '🔥',
    title: 'Avancé',
    selected: false,
    onPress: () => console.log('Pressed!'),
  },
};

// Story interactive avec état
export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    const options = [
      { id: '5k', emoji: '🏃', title: '5K', desc: 'Idéal pour débuter' },
      { id: '10k', emoji: '🏃‍♂️', title: '10K', desc: 'Le classique' },
      { id: 'semi', emoji: '🏅', title: 'Semi', desc: '21,1 km' },
      { id: 'marathon', emoji: '🏆', title: 'Marathon', desc: '42,195 km' },
    ];

    return (
      <View style={{ gap: 12 }}>
        {options.map((opt) => (
          <SelectCard
            key={opt.id}
            emoji={opt.emoji}
            title={opt.title}
            description={opt.desc}
            selected={selected === opt.id}
            onPress={() => setSelected(opt.id)}
          />
        ))}
      </View>
    );
  },
};
