import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Card } from '../../src/components';
import { colors, typography, spacing } from '../../src/design-system';

/**
 * # Card
 *
 * Conteneur générique avec différentes variantes visuelles.
 *
 * ## Variants
 * - `elevated` : Avec ombre (défaut)
 * - `outlined` : Avec bordure
 * - `filled` : Fond gris clair
 *
 * ## Padding
 * - `none` : Pas de padding
 * - `sm` : 8px
 * - `md` : 16px (défaut)
 * - `lg` : 24px
 *
 * ## Tokens utilisés
 * - `colors.neutral[0]` : Fond
 * - `colors.neutral[50]` : Fond filled
 * - `colors.neutral[200]` : Bordure outlined
 * - `shadows.md` : Ombre elevated
 * - `borderRadius.lg` : Arrondi
 */
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: colors.neutral[100] }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Style visuel',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding interne',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const CardContent = () => (
  <>
    <Text style={{ fontSize: typography.fontSize.lg, fontWeight: '600', color: colors.neutral[900] }}>
      Titre de la carte
    </Text>
    <Text style={{ fontSize: typography.fontSize.md, color: colors.neutral[600], marginTop: spacing.xs }}>
      Contenu de la carte avec du texte descriptif.
    </Text>
  </>
);

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    children: <CardContent />,
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    padding: 'md',
    children: <CardContent />,
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    padding: 'md',
    children: <CardContent />,
  },
};

export const NoPadding: Story = {
  args: {
    variant: 'elevated',
    padding: 'none',
    children: (
      <View style={{ padding: spacing.md }}>
        <CardContent />
      </View>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    variant: 'elevated',
    padding: 'lg',
    children: <CardContent />,
  },
};
