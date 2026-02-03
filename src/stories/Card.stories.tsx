import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Card } from '../components/Card';
import { useTheme } from '../design-system';

/**
 * # Card
 *
 * Conteneur avec fond, bordure et ombre subtile.
 * **Supporte le Dark Mode** - utilise le sélecteur de background dans la toolbar.
 *
 * ## Utilisation
 * - Grouper du contenu connexe
 * - Créer des sections visuellement distinctes
 * - Encapsuler des formulaires ou listes
 *
 * ## Tokens utilisés
 * - `colors.background.surface` : Fond de la carte
 * - `colors.border.default` : Bordure
 * - `shadows.sm` : Ombre légère
 * - `borderRadius.lg` : Arrondi (16px)
 */
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
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
type Story = StoryObj<typeof Card>;

// Composant helper pour le texte avec thème
const ThemedText = ({ variant, children }: { variant: 'title' | 'body'; children: React.ReactNode }) => {
  const { colors, typography } = useTheme();
  const style = variant === 'title'
    ? { fontSize: 18, fontWeight: '600' as const, color: colors.text.primary, marginBottom: 8 }
    : { fontSize: 14, color: colors.text.secondary };
  return <Text style={style}>{children}</Text>;
};

export const Default: Story = {
  render: () => (
    <Card>
      <ThemedText variant="title">Titre de la carte</ThemedText>
      <ThemedText variant="body">
        Contenu de la carte avec une description qui peut s'étendre sur plusieurs lignes.
      </ThemedText>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated">
      <ThemedText variant="title">Carte élevée</ThemedText>
      <ThemedText variant="body">
        Cette carte a une ombre portée.
      </ThemedText>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined">
      <ThemedText variant="title">Carte outlined</ThemedText>
      <ThemedText variant="body">
        Cette carte a une bordure visible.
      </ThemedText>
    </Card>
  ),
};

export const Filled: Story = {
  render: () => (
    <Card variant="filled">
      <ThemedText variant="title">Carte filled</ThemedText>
      <ThemedText variant="body">
        Cette carte a un fond muted.
      </ThemedText>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Card variant="elevated">
        <ThemedText variant="title">Elevated</ThemedText>
      </Card>
      <Card variant="outlined">
        <ThemedText variant="title">Outlined</ThemedText>
      </Card>
      <Card variant="filled">
        <ThemedText variant="title">Filled</ThemedText>
      </Card>
    </View>
  ),
};

export const AllPaddings: Story = {
  render: () => {
    const { colors } = useTheme();
    return (
      <View style={{ gap: 12 }}>
        <Card padding="none" variant="outlined">
          <Text style={{ color: colors.text.primary }}>padding: none</Text>
        </Card>
        <Card padding="sm" variant="outlined">
          <Text style={{ color: colors.text.primary }}>padding: sm</Text>
        </Card>
        <Card padding="md" variant="outlined">
          <Text style={{ color: colors.text.primary }}>padding: md</Text>
        </Card>
        <Card padding="lg" variant="outlined">
          <Text style={{ color: colors.text.primary }}>padding: lg</Text>
        </Card>
      </View>
    );
  },
};
