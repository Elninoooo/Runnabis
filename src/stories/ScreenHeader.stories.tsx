import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Settings, Share2, Heart, MoreVertical } from 'lucide-react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { IconButton } from '../components/IconButton';
import { useTheme } from '../design-system';

/**
 * # ScreenHeader
 *
 * En-tête d'écran avec bouton retour et titre centré.
 * **Supporte le Dark Mode** - utilise le sélecteur de background dans la toolbar.
 *
 * ## Utilisation
 * - Navigation secondaire (détail, settings, etc.)
 * - Écrans modaux
 *
 * ## Props
 * - `title` : Titre de l'écran
 * - `onBack` : Callback pour le bouton retour (optionnel)
 * - `rightAction` : ReactNode pour action à droite (optionnel)
 * - `showBorder` : Affiche une bordure en bas (default: false)
 *
 * ## Composition
 * - Utilise IconButton avec ArrowLeft pour le retour
 * - Titre centré avec typography.fontSize.xl
 * - Zone droite pour actions additionnelles
 *
 * ## Tokens utilisés
 * - `colors.text.primary` : Titre
 * - `colors.background.primary` : Fond
 * - `colors.border.default` : Bordure (si showBorder)
 */
const meta: Meta<typeof ScreenHeader> = {
  title: 'Components/ScreenHeader',
  component: ScreenHeader,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Titre de l\'écran',
    },
    showBorder: {
      control: 'boolean',
      description: 'Affiche une bordure en bas',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ width: '100%' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScreenHeader>;

export const Default: Story = {
  args: {
    title: 'Paramètres',
    onBack: () => console.log('Back pressed'),
  },
};

export const WithBorder: Story = {
  args: {
    title: 'Paramètres',
    onBack: () => console.log('Back pressed'),
    showBorder: true,
  },
};

export const WithoutBackButton: Story = {
  args: {
    title: 'Mon plan',
  },
};

export const WithRightAction: Story = {
  render: function Render() {
    const { colors } = useTheme();
    return (
      <ScreenHeader
        title="Détail séance"
        onBack={() => console.log('Back')}
        rightAction={
          <IconButton
            icon={<Share2 size={20} color={colors.text.secondary} strokeWidth={2} />}
            onPress={() => console.log('Share')}
            variant="ghost"
          />
        }
      />
    );
  },
};

export const WithMultipleActions: Story = {
  render: function Render() {
    const { colors } = useTheme();
    return (
      <ScreenHeader
        title="Article"
        onBack={() => console.log('Back')}
        rightAction={
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <IconButton
              icon={<Heart size={20} color={colors.text.secondary} strokeWidth={2} />}
              onPress={() => console.log('Like')}
              variant="ghost"
              size="sm"
            />
            <IconButton
              icon={<MoreVertical size={20} color={colors.text.secondary} strokeWidth={2} />}
              onPress={() => console.log('More')}
              variant="ghost"
              size="sm"
            />
          </View>
        }
      />
    );
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Endurance fondamentale',
    onBack: () => console.log('Back'),
    showBorder: true,
  },
};

export const ScreenExample: Story = {
  render: function Render() {
    const { colors, spacing, typography } = useTheme();
    return (
      <View style={{ backgroundColor: colors.background.primary, minHeight: 400 }}>
        <ScreenHeader
          title="Paramètres"
          onBack={() => console.log('Back')}
          showBorder
        />
        <View style={{ padding: spacing.lg }}>
          <Text style={{ color: colors.text.secondary, fontSize: typography.fontSize.md }}>
            Contenu de l'écran...
          </Text>
        </View>
      </View>
    );
  },
};
