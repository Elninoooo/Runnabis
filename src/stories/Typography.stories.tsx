import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../design-system';

/**
 * # Typographie
 *
 * L'échelle typographique de Runnabis utilise la font système
 * pour des performances optimales sur mobile.
 */
const meta: Meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Scale: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Typographie</Text>
      <Text style={styles.pageDesc}>
        Hiérarchie claire avec System font pour les performances
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Échelle de texte</Text>
        {Object.entries(typography.scale).map(([name, style]) => (
          <View key={name} style={styles.scaleRow}>
            <View style={styles.scalePreview}>
              <Text
                style={{
                  fontSize: style.fontSize,
                  fontWeight: style.fontWeight as any,
                  color: colors.text.primary,
                }}
              >
                {name}
              </Text>
            </View>
            <View style={styles.scaleMeta}>
              <Text style={styles.metaLabel}>{style.fontSize}px</Text>
              <Text style={styles.metaLabel}>{style.fontWeight}</Text>
              <Text style={styles.metaLabel}>lh: {style.lineHeight}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Font Sizes</Text>
        {Object.entries(typography.fontSize).map(([name, size]) => (
          <View key={name} style={styles.sizeRow}>
            <Text style={[styles.sizePreview, { fontSize: size }]}>Aa</Text>
            <Text style={styles.sizeName}>{name}</Text>
            <Text style={styles.sizeValue}>{size}px</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Font Weights</Text>
        {Object.entries(typography.fontWeight).map(([name, weight]) => (
          <View key={name} style={styles.weightRow}>
            <Text style={[styles.weightPreview, { fontWeight: weight as any }]}>
              Runnabis
            </Text>
            <Text style={styles.weightName}>{name}</Text>
            <Text style={styles.weightValue}>{weight}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Exemple d'utilisation</Text>
        <View style={styles.exampleCard}>
          <Text style={[typography.scale.h1, { color: colors.text.primary, marginBottom: 8 }]}>
            Ton programme
          </Text>
          <Text style={[typography.scale.body, { color: colors.text.secondary, marginBottom: 16 }]}>
            Semaine 4 sur 12 — Tu es sur la bonne voie !
          </Text>
          <Text style={[typography.scale.caption, { color: colors.text.muted }]}>
            Prochaine séance : Mardi
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
    padding: spacing.lg,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  pageDesc: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing['2xl'],
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },

  // Scale
  scaleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  scalePreview: {
    flex: 1,
  },
  scaleMeta: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metaLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
    backgroundColor: colors.background.muted,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: 'monospace',
  },

  // Sizes
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  sizePreview: {
    width: 50,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  sizeName: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  sizeValue: {
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
    fontFamily: 'monospace',
  },

  // Weights
  weightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  weightPreview: {
    width: 120,
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
  },
  weightName: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  weightValue: {
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
    fontFamily: 'monospace',
  },

  // Example
  exampleCard: {
    backgroundColor: colors.background.surface,
    padding: spacing.lg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
});
