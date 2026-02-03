import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { useState } from 'react';
import { Checkbox } from '../../src/components';

/**
 * # Checkbox
 *
 * Case à cocher pour les sélections multiples.
 *
 * ## Usage
 * Utilisé dans l'onboarding pour la sélection des jours disponibles.
 *
 * ## Tokens utilisés
 * - `colors.primary[500]` : Fond coché
 * - `colors.neutral[400]` : Bordure non cochée
 * - `colors.neutral[0]` : Checkmark
 * - `borderRadius.sm` : Arrondi de la box
 * - `spacing.sm/md` : Padding et gaps
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label affiché',
    },
    checked: {
      control: 'boolean',
      description: 'État coché',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactivé',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: {
    label: 'Lundi',
    checked: false,
    onToggle: () => console.log('Toggled!'),
  },
};

export const Checked: Story = {
  args: {
    label: 'Mardi',
    checked: true,
    onToggle: () => console.log('Toggled!'),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Mercredi (indisponible)',
    checked: false,
    disabled: true,
    onToggle: () => console.log('Toggled!'),
  },
};

// Story interactive - sélection de jours
export const DaySelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['mardi', 'jeudi', 'samedi']);
    const maxDays = 3;

    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    const toggle = (day: string) => {
      const lowDay = day.toLowerCase();
      if (selected.includes(lowDay)) {
        setSelected(selected.filter((d) => d !== lowDay));
      } else if (selected.length < maxDays) {
        setSelected([...selected, lowDay]);
      }
    };

    return (
      <View style={{ gap: 4 }}>
        {days.map((day) => {
          const lowDay = day.toLowerCase();
          const isChecked = selected.includes(lowDay);
          const isDisabled = !isChecked && selected.length >= maxDays;

          return (
            <Checkbox
              key={day}
              label={day}
              checked={isChecked}
              disabled={isDisabled}
              onToggle={() => toggle(day)}
            />
          );
        })}
      </View>
    );
  },
};
