import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Button } from '../components/Button';

/**
 * # Button
 *
 * Le composant Button est utilisé pour les actions principales et secondaires.
 * **Supporte le Dark Mode** - utilise le sélecteur de background dans la toolbar.
 *
 * ## Variants
 * - `primary` : Action principale (fond teal)
 * - `secondary` : Action secondaire (fond transparent, bordure)
 * - `ghost` : Action tertiaire (texte uniquement)
 *
 * ## Sizes
 * - `sm` : Petit (36px)
 * - `md` : Moyen (48px) - défaut
 * - `lg` : Grand (56px)
 *
 * ## Tokens utilisés
 * - `colors.accent.default` : Couleur de fond primary
 * - `colors.text.inverse` : Couleur texte sur primary
 * - `borderRadius.lg` : Arrondi des boutons (16px)
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Le style visuel du bouton',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'La taille du bouton',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    loading: {
      control: 'boolean',
      description: 'État de chargement',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Largeur 100%',
    },
    label: {
      control: 'text',
      description: 'Le texte du bouton',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, minWidth: 300 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Continuer',
    variant: 'primary',
    size: 'md',
    onPress: () => console.log('Pressed'),
  },
};

export const Secondary: Story = {
  args: {
    label: 'Annuler',
    variant: 'secondary',
    size: 'md',
    onPress: () => console.log('Pressed'),
  },
};

export const Ghost: Story = {
  args: {
    label: 'En savoir plus',
    variant: 'ghost',
    size: 'md',
    onPress: () => console.log('Pressed'),
  },
};

export const Small: Story = {
  args: {
    label: 'Petit',
    variant: 'primary',
    size: 'sm',
    onPress: () => console.log('Pressed'),
  },
};

export const Large: Story = {
  args: {
    label: 'Grand bouton',
    variant: 'primary',
    size: 'lg',
    onPress: () => console.log('Pressed'),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Désactivé',
    variant: 'primary',
    disabled: true,
    onPress: () => console.log('Pressed'),
  },
};

export const Loading: Story = {
  args: {
    label: 'Chargement...',
    variant: 'primary',
    loading: true,
    onPress: () => console.log('Pressed'),
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Largeur complète',
    variant: 'primary',
    fullWidth: true,
    onPress: () => console.log('Pressed'),
  },
};

/**
 * Tous les variants côte à côte pour comparaison
 */
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button label="Primary" variant="primary" onPress={() => {}} />
      <Button label="Secondary" variant="secondary" onPress={() => {}} />
      <Button label="Ghost" variant="ghost" onPress={() => {}} />
    </View>
  ),
};

/**
 * Toutes les tailles pour comparaison
 */
export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Button label="Small" variant="primary" size="sm" onPress={() => {}} />
      <Button label="Medium" variant="primary" size="md" onPress={() => {}} />
      <Button label="Large" variant="primary" size="lg" onPress={() => {}} />
    </View>
  ),
};
