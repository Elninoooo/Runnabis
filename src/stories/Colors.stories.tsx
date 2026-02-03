import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../design-system';

/**
 * # Palette de Couleurs
 *
 * La palette "Warm Adult" de Runnabis utilise des teintes
 * teal chaleureuses sur des fonds crème.
 *
 * **Supporte le Dark Mode** - switche le thème pour voir les deux palettes.
 */
const meta: Meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const ColorSwatch = ({
  name,
  color,
  textColor,
}: {
  name: string;
  color: string;
  textColor?: string;
}) => {
  const { colors } = useTheme();
  const finalTextColor = textColor || colors.text.primary;

  return (
    <View style={[styles.swatch, { backgroundColor: color, borderColor: colors.border.default }]}>
      <Text style={[styles.swatchName, { color: finalTextColor }]}>{name}</Text>
      <Text style={[styles.swatchValue, { color: finalTextColor }]}>{color}</Text>
    </View>
  );
};

const ColorSection = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={{ marginBottom: spacing['2xl'] }}>
      <Text style={{
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.primary,
        marginBottom: spacing.xs,
      }}>
        {title}
      </Text>
      {description && (
        <Text style={{
          fontSize: typography.fontSize.sm,
          color: colors.text.muted,
          marginBottom: spacing.md,
        }}>
          {description}
        </Text>
      )}
      <View style={styles.swatchGrid}>{children}</View>
    </View>
  );
};

export const AllColors: StoryObj = {
  render: () => {
    const { colors, typography, spacing, mode } = useTheme();

    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.pageTitle, { color: colors.text.primary }]}>Couleurs</Text>
        <Text style={[styles.pageDesc, { color: colors.text.secondary }]}>
          Palette "Warm Adult" — Mode: {mode}
        </Text>

        <ColorSection title="Backgrounds" description="Fonds de l'interface">
          <ColorSwatch name="primary" color={colors.background.primary} />
          <ColorSwatch name="surface" color={colors.background.surface} />
          <ColorSwatch name="surfaceHover" color={colors.background.surfaceHover} />
          <ColorSwatch name="muted" color={colors.background.muted} />
        </ColorSection>

        <ColorSection title="Text" description="Couleurs de texte">
          <ColorSwatch name="primary" color={colors.text.primary} textColor="#FFF" />
          <ColorSwatch name="secondary" color={colors.text.secondary} textColor="#FFF" />
          <ColorSwatch name="muted" color={colors.text.muted} />
          <ColorSwatch name="inverse" color={colors.text.inverse} />
        </ColorSection>

        <ColorSection title="Accent (Teal)" description="Couleur principale de la marque">
          <ColorSwatch name="default" color={colors.accent.default} textColor="#FFF" />
          <ColorSwatch name="hover" color={colors.accent.hover} textColor="#FFF" />
          <ColorSwatch name="soft" color={colors.accent.soft} />
          <ColorSwatch name="medium" color={colors.accent.medium} />
        </ColorSection>

        <ColorSection title="Semantic" description="Couleurs de feedback">
          <ColorSwatch name="success" color={colors.semantic.success} textColor="#FFF" />
          <ColorSwatch name="successSoft" color={colors.semantic.successSoft} />
          <ColorSwatch name="error" color={colors.semantic.error} textColor="#FFF" />
          <ColorSwatch name="errorSoft" color={colors.semantic.errorSoft} />
          <ColorSwatch name="warning" color={colors.semantic.warning} textColor="#FFF" />
          <ColorSwatch name="warningSoft" color={colors.semantic.warningSoft} />
        </ColorSection>

        <ColorSection title="Borders" description="Bordures et séparateurs">
          <ColorSwatch name="default" color={colors.border.default} />
          <ColorSwatch name="subtle" color={colors.border.subtle} />
          <ColorSwatch name="strong" color={colors.border.strong} />
        </ColorSection>

        <ColorSection title="Workout Types" description="Couleurs par type d'entraînement">
          <ColorSwatch name="endurance" color={colors.workout.endurance} />
          <ColorSwatch name="fractionne" color={colors.workout.fractionne} />
          <ColorSwatch name="allure" color={colors.workout.allure} />
          <ColorSwatch name="sortieLongue" color={colors.workout.sortieLongue} />
          <ColorSwatch name="recuperation" color={colors.workout.recuperation} />
        </ColorSection>
      </ScrollView>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  pageDesc: {
    fontSize: 15,
    marginBottom: 32,
  },
  swatchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  swatch: {
    width: 120,
    height: 80,
    borderRadius: 12,
    padding: 8,
    justifyContent: 'flex-end',
    borderWidth: 1,
  },
  swatchName: {
    fontSize: 13,
    fontWeight: '500',
  },
  swatchValue: {
    fontSize: 10,
    fontFamily: 'monospace',
    opacity: 0.8,
  },
});
