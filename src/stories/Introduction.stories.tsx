import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../design-system';

/**
 * # Runnabis Design System
 *
 * Bienvenue dans le Design System de Runnabis.
 * Cette documentation centralise toutes les guidelines visuelles et les composants.
 */
const meta: Meta = {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Welcome: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Runnabis</Text>
        <Text style={styles.heroSubtitle}>Design System</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Direction Créative</Text>
        <View style={styles.directionCard}>
          <Text style={styles.directionLabel}>Warm Adult</Text>
          <Text style={styles.directionDesc}>
            Chaleureux, Encourageant, Accessible, Adulte
          </Text>
        </View>

        <Text style={styles.paragraph}>
          Runnabis se positionne entre le minimalisme de Bend et le côté playful de Duolingo.
          Notre objectif : être chaleureux et encourageant, tout en restant adulte et professionnel.
        </Text>

        <Text style={styles.sectionTitle}>Structure</Text>

        <View style={styles.structureItem}>
          <Text style={styles.structureTitle}>Branding</Text>
          <Text style={styles.structureDesc}>Guidelines, ton de voix, règles visuelles</Text>
        </View>

        <View style={styles.structureItem}>
          <Text style={styles.structureTitle}>Design System</Text>
          <Text style={styles.structureDesc}>Tokens (couleurs, typo, espacements)</Text>
        </View>

        <View style={styles.structureItem}>
          <Text style={styles.structureTitle}>Components</Text>
          <Text style={styles.structureDesc}>Button, Card, SelectCard, Checkbox...</Text>
        </View>

        <Text style={styles.sectionTitle}>Règle d'Or</Text>
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>Pas d'emojis</Text>
          <Text style={styles.warningText}>
            Les emojis sont interdits dans l'interface.
            Utiliser des icônes Lucide/Phosphor ou des illustrations flat.
          </Text>
        </View>
      </View>
    </ScrollView>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  hero: {
    backgroundColor: colors.accent.default,
    padding: spacing.xl,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing['2xl'],
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.inverse,
  },
  heroSubtitle: {
    fontSize: typography.fontSize.xl,
    color: colors.text.inverse,
    opacity: 0.9,
  },
  content: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  paragraph: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  directionCard: {
    backgroundColor: colors.accent.soft,
    padding: spacing.lg,
    borderRadius: 16,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent.default,
  },
  directionLabel: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.accent.default,
    marginBottom: spacing.xs,
  },
  directionDesc: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  structureItem: {
    backgroundColor: colors.background.surface,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  structureTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  structureDesc: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: 4,
  },
  warningBox: {
    backgroundColor: '#FEF3E7',
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8A838',
  },
  warningTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: '#B8860B',
    marginBottom: spacing.xs,
  },
  warningText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    lineHeight: 22,
  },
});
