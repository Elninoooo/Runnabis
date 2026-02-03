import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Sprout, Dumbbell, Flame, Route, MapPin, Medal, Trophy } from 'lucide-react-native';
import { SelectCard } from '../components/SelectCard';
import { useTheme } from '../design-system';

/**
 * # SelectCard
 *
 * Carte sélectionnable pour les choix uniques ou multiples.
 * **Supporte le Dark Mode** - utilise le sélecteur de background dans la toolbar.
 *
 * ## Utilisation
 * - Sélection de niveau (débutant, intermédiaire, expert)
 * - Choix de distance de course
 * - Options de personnalisation
 *
 * ## États
 * - Default : Fond surface, bordure default
 * - Selected : Bordure accent, fond légèrement teinté
 *
 * ## Props
 * - `icon` : ReactNode optionnel (icône Lucide)
 * - `title` : Titre de la carte
 * - `description` : Description optionnelle
 * - `selected` : État sélectionné
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

// Helper pour les icônes
const IconWrapper = ({ Icon, selected }: { Icon: React.ComponentType<any>; selected: boolean }) => {
  const { colors } = useTheme();
  return <Icon size={24} color={selected ? colors.accent.default : colors.text.secondary} strokeWidth={2} />;
};

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
  render: function Render() {
    const { colors } = useTheme();
    return (
      <View style={{ gap: 12 }}>
        <SelectCard
          icon={<Sprout size={24} color={colors.text.secondary} strokeWidth={2} />}
          title="Débutant"
          description="Je débute ou reprends la course"
          selected={false}
          onPress={() => {}}
        />
        <SelectCard
          icon={<Dumbbell size={24} color={colors.accent.default} strokeWidth={2} />}
          title="Intermédiaire"
          description="Je cours régulièrement depuis quelques mois"
          selected={true}
          onPress={() => {}}
        />
        <SelectCard
          icon={<Flame size={24} color={colors.text.secondary} strokeWidth={2} />}
          title="Avancé"
          description="Je cours depuis plus d'un an"
          selected={false}
          onPress={() => {}}
        />
      </View>
    );
  },
};

export const RaceSelection: Story = {
  render: function Render() {
    const { colors } = useTheme();
    return (
      <View style={{ gap: 12 }}>
        <SelectCard
          icon={<Route size={24} color={colors.text.secondary} strokeWidth={2} />}
          title="5 kilomètres"
          description="Idéal pour débuter • ~25-35 min"
          selected={false}
          onPress={() => {}}
        />
        <SelectCard
          icon={<MapPin size={24} color={colors.text.secondary} strokeWidth={2} />}
          title="10 kilomètres"
          description="Le classique • ~45-60 min"
          selected={false}
          onPress={() => {}}
        />
        <SelectCard
          icon={<Medal size={24} color={colors.accent.default} strokeWidth={2} />}
          title="Semi-marathon"
          description="21,1 km • ~1h45-2h30"
          selected={true}
          onPress={() => {}}
        />
        <SelectCard
          icon={<Trophy size={24} color={colors.text.secondary} strokeWidth={2} />}
          title="Marathon"
          description="42,195 km • Le défi ultime"
          selected={false}
          onPress={() => {}}
        />
      </View>
    );
  },
};
