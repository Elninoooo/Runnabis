import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Settings, ArrowLeft, X, Plus, ChevronRight, Heart, Share2, MoreVertical } from 'lucide-react-native';
import { IconButton } from '../components/IconButton';
import { useTheme } from '../design-system';

/**
 * # IconButton
 *
 * Bouton avec icône uniquement pour les actions de navigation et utilitaires.
 * **Supporte le Dark Mode** - utilise le sélecteur de background dans la toolbar.
 *
 * ## Utilisation
 * - Bouton retour (navigation)
 * - Bouton settings
 * - Actions rapides (like, share, close)
 *
 * ## Variantes
 * - `default` : Fond surface avec bordure
 * - `ghost` : Transparent, pas de bordure
 * - `muted` : Fond muted, pas de bordure
 *
 * ## Tailles
 * - `sm` : 32x32px
 * - `md` : 40x40px (default)
 * - `lg` : 48x48px
 *
 * ## Tokens utilisés
 * - `colors.background.surface` : Fond default
 * - `colors.background.muted` : Fond muted
 * - `colors.border.default` : Bordure default
 */
const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'muted'],
      description: 'Style du bouton',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du bouton',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
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
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  render: function Render() {
    const { colors } = useTheme();
    return (
      <IconButton
        icon={<Settings size={20} color={colors.text.secondary} strokeWidth={2} />}
        onPress={() => console.log('Settings pressed')}
        variant="default"
      />
    );
  },
};

export const Ghost: Story = {
  render: function Render() {
    const { colors } = useTheme();
    return (
      <IconButton
        icon={<ArrowLeft size={20} color={colors.text.primary} strokeWidth={2} />}
        onPress={() => console.log('Back pressed')}
        variant="ghost"
      />
    );
  },
};

export const Muted: Story = {
  render: function Render() {
    const { colors } = useTheme();
    return (
      <IconButton
        icon={<X size={20} color={colors.text.secondary} strokeWidth={2} />}
        onPress={() => console.log('Close pressed')}
        variant="muted"
      />
    );
  },
};

export const Sizes: Story = {
  render: function Render() {
    const { colors } = useTheme();
    return (
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <IconButton
          icon={<Plus size={16} color={colors.text.secondary} strokeWidth={2} />}
          onPress={() => {}}
          size="sm"
        />
        <IconButton
          icon={<Plus size={20} color={colors.text.secondary} strokeWidth={2} />}
          onPress={() => {}}
          size="md"
        />
        <IconButton
          icon={<Plus size={24} color={colors.text.secondary} strokeWidth={2} />}
          onPress={() => {}}
          size="lg"
        />
      </View>
    );
  },
};

export const AllVariants: Story = {
  render: function Render() {
    const { colors } = useTheme();
    return (
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <IconButton
          icon={<Settings size={20} color={colors.text.secondary} strokeWidth={2} />}
          onPress={() => {}}
          variant="default"
        />
        <IconButton
          icon={<Settings size={20} color={colors.text.secondary} strokeWidth={2} />}
          onPress={() => {}}
          variant="ghost"
        />
        <IconButton
          icon={<Settings size={20} color={colors.text.secondary} strokeWidth={2} />}
          onPress={() => {}}
          variant="muted"
        />
      </View>
    );
  },
};

export const NavigationExample: Story = {
  render: function Render() {
    const { colors } = useTheme();
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300 }}>
        <IconButton
          icon={<ArrowLeft size={20} color={colors.text.primary} strokeWidth={2} />}
          onPress={() => console.log('Back')}
          variant="ghost"
        />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <IconButton
            icon={<Heart size={20} color={colors.text.secondary} strokeWidth={2} />}
            onPress={() => console.log('Like')}
            variant="ghost"
          />
          <IconButton
            icon={<Share2 size={20} color={colors.text.secondary} strokeWidth={2} />}
            onPress={() => console.log('Share')}
            variant="ghost"
          />
          <IconButton
            icon={<MoreVertical size={20} color={colors.text.secondary} strokeWidth={2} />}
            onPress={() => console.log('More')}
            variant="ghost"
          />
        </View>
      </View>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    const { colors } = useTheme();
    return (
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <IconButton
          icon={<Settings size={20} color={colors.text.secondary} strokeWidth={2} />}
          onPress={() => {}}
          disabled
        />
        <IconButton
          icon={<Settings size={20} color={colors.text.secondary} strokeWidth={2} />}
          onPress={() => {}}
          variant="ghost"
          disabled
        />
      </View>
    );
  },
};
