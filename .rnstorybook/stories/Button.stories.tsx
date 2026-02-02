import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Button } from '../../src/components';

/**
 * # Button
 *
 * Le composant bouton principal de l'application.
 *
 * ## Variants
 * - `primary` : Action principale (fond vert)
 * - `secondary` : Action secondaire (outline)
 * - `ghost` : Action tertiaire (texte seul)
 *
 * ## Sizes
 * - `sm` : Petit (36px)
 * - `md` : Medium (48px) - défaut
 * - `lg` : Large (56px)
 *
 * ## Tokens utilisés
 * - `colors.primary[500]` : Couleur de fond primary
 * - `colors.neutral[0]` : Texte sur primary
 * - `borderRadius.lg` : Arrondi des coins
 * - `spacing.sm/md/lg` : Padding interne
 * - `typography.fontWeight.semibold` : Poids du texte
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, gap: 12 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Style visuel du bouton',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du bouton',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le bouton',
    },
    loading: {
      control: 'boolean',
      description: 'Affiche un loader',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Prend toute la largeur',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Story par défaut
export const Primary: Story = {
  args: {
    label: 'Continuer',
    variant: 'primary',
    size: 'md',
    onPress: () => console.log('Pressed!'),
  },
};

export const Secondary: Story = {
  args: {
    label: 'Retour',
    variant: 'secondary',
    size: 'md',
    onPress: () => console.log('Pressed!'),
  },
};

export const Ghost: Story = {
  args: {
    label: 'Annuler',
    variant: 'ghost',
    size: 'md',
    onPress: () => console.log('Pressed!'),
  },
};

export const Small: Story = {
  args: {
    label: 'Petit',
    variant: 'primary',
    size: 'sm',
    onPress: () => console.log('Pressed!'),
  },
};

export const Large: Story = {
  args: {
    label: 'Grand bouton',
    variant: 'primary',
    size: 'lg',
    onPress: () => console.log('Pressed!'),
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Générer mon plan',
    variant: 'primary',
    size: 'lg',
    fullWidth: true,
    onPress: () => console.log('Pressed!'),
  },
};

export const Loading: Story = {
  args: {
    label: 'Chargement...',
    variant: 'primary',
    size: 'md',
    loading: true,
    onPress: () => console.log('Pressed!'),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Désactivé',
    variant: 'primary',
    size: 'md',
    disabled: true,
    onPress: () => console.log('Pressed!'),
  },
};
