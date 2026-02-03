import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { useState } from 'react';
import { Stepper } from '../../src/components';
import { colors, typography } from '../../src/design-system';

/**
 * # Stepper
 *
 * Sélecteur de valeur numérique avec boutons +/-.
 *
 * ## Usage
 * Utilisé dans l'onboarding pour sélectionner le nombre de séances par semaine.
 *
 * ## Props
 * - `value` : Valeur actuelle
 * - `min` / `max` : Limites
 * - `label` : Label sous la valeur
 *
 * ## Tokens utilisés
 * - `colors.primary[500]` : Boutons actifs
 * - `colors.neutral[200]` : Boutons désactivés
 * - `typography.fontSize['4xl']` : Taille de la valeur
 * - `borderRadius.full` : Boutons ronds
 */
const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Valeur actuelle',
    },
    min: {
      control: 'number',
      description: 'Valeur minimum',
    },
    max: {
      control: 'number',
      description: 'Valeur maximum',
    },
    label: {
      control: 'text',
      description: 'Label sous la valeur',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    value: 3,
    min: 1,
    max: 7,
    label: 'séances / semaine',
    onChange: (v) => console.log('Value:', v),
  },
};

export const AtMinimum: Story = {
  args: {
    value: 2,
    min: 2,
    max: 6,
    label: 'séances / semaine',
    onChange: (v) => console.log('Value:', v),
  },
};

export const AtMaximum: Story = {
  args: {
    value: 6,
    min: 2,
    max: 6,
    label: 'séances / semaine',
    onChange: (v) => console.log('Value:', v),
  },
};

export const WithoutLabel: Story = {
  args: {
    value: 5,
    min: 1,
    max: 10,
    onChange: (v) => console.log('Value:', v),
  },
};

// Story interactive
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(3);

    return (
      <View style={{ alignItems: 'center', gap: 20 }}>
        <Stepper
          value={value}
          min={2}
          max={6}
          onChange={setValue}
          label="séances / semaine"
        />
        <Text style={{ color: colors.neutral[600], fontSize: typography.fontSize.sm }}>
          Recommandation : 3-4 séances pour un semi-marathon
        </Text>
      </View>
    );
  },
};
