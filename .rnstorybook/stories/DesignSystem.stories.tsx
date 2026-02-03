import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../src/design-system';

/**
 * # Design System
 *
 * Documentation des tokens de design utilisés dans Runnabis.
 */
const meta: Meta = {
  title: 'Design System/Tokens',
};

export default meta;

// Composant pour afficher une couleur
const ColorSwatch = ({ name, color }: { name: string; color: string }) => (
  <View style={styles.colorSwatch}>
    <View style={[styles.colorBox, { backgroundColor: color }]} />
    <Text style={styles.colorName}>{name}</Text>
    <Text style={styles.colorValue}>{color}</Text>
  </View>
);

// Composant pour afficher une palette
const ColorPalette = ({ name, palette }: { name: string; palette: Record<string, string> }) => (
  <View style={styles.palette}>
    <Text style={styles.paletteTitle}>{name}</Text>
    <View style={styles.swatchRow}>
      {Object.entries(palette).map(([shade, color]) => (
        <ColorSwatch key={shade} name={shade} color={color} />
      ))}
    </View>
  </View>
);

/**
 * ## Colors
 *
 * La palette de couleurs de l'application.
 */
export const Colors: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Couleurs</Text>

      <ColorPalette name="Primary (Vert)" palette={colors.primary} />
      <ColorPalette name="Secondary (Orange)" palette={colors.secondary} />
      <ColorPalette name="Neutral (Gris)" palette={colors.neutral} />

      <Text style={styles.subtitle}>Couleurs sémantiques</Text>
      <View style={styles.swatchRow}>
        <ColorSwatch name="Success" color={colors.success} />
        <ColorSwatch name="Warning" color={colors.warning} />
        <ColorSwatch name="Error" color={colors.error} />
        <ColorSwatch name="Info" color={colors.info} />
      </View>
    </ScrollView>
  ),
};

/**
 * ## Typography
 *
 * Les tailles de texte utilisées.
 */
export const Typography: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Typographie</Text>

      <Text style={styles.subtitle}>Font Sizes</Text>
      {Object.entries(typography.fontSize).map(([name, size]) => (
        <View key={name} style={styles.typoRow}>
          <Text style={[styles.typoSample, { fontSize: size }]}>
            Runnabis
          </Text>
          <Text style={styles.typoLabel}>
            {name} ({size}px)
          </Text>
        </View>
      ))}

      <Text style={styles.subtitle}>Font Weights</Text>
      {Object.entries(typography.fontWeight).map(([name, weight]) => (
        <View key={name} style={styles.typoRow}>
          <Text style={[styles.typoSample, { fontWeight: weight }]}>
            Runnabis
          </Text>
          <Text style={styles.typoLabel}>
            {name} ({weight})
          </Text>
        </View>
      ))}
    </ScrollView>
  ),
};

/**
 * ## Spacing
 *
 * L'échelle d'espacement (basée sur 4px).
 */
export const Spacing: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Espacements</Text>
      <Text style={styles.description}>
        Échelle basée sur 4px pour une cohérence visuelle.
      </Text>

      {Object.entries(spacing).map(([name, value]) => (
        <View key={name} style={styles.spacingRow}>
          <View style={[styles.spacingBox, { width: value, height: 24 }]} />
          <Text style={styles.spacingLabel}>
            {name} = {value}px
          </Text>
        </View>
      ))}
    </ScrollView>
  ),
};

/**
 * ## Border Radius
 *
 * Les arrondis disponibles.
 */
export const BorderRadius: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Border Radius</Text>

      <View style={styles.radiusGrid}>
        {Object.entries(borderRadius).map(([name, value]) => (
          <View key={name} style={styles.radiusItem}>
            <View
              style={[
                styles.radiusBox,
                { borderRadius: value > 50 ? 25 : value },
              ]}
            />
            <Text style={styles.radiusLabel}>{name}</Text>
            <Text style={styles.radiusValue}>{value}px</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  ),
};

/**
 * ## Shadows
 *
 * Les ombres disponibles.
 */
export const Shadows: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ombres</Text>

      <View style={styles.shadowGrid}>
        {Object.entries(shadows).map(([name, shadow]) => (
          <View key={name} style={styles.shadowItem}>
            <View style={[styles.shadowBox, shadow]} />
            <Text style={styles.shadowLabel}>{name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.neutral[800],
    marginTop: 24,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: colors.neutral[600],
    marginBottom: 16,
  },

  // Colors
  palette: {
    marginBottom: 24,
  },
  paletteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[700],
    marginBottom: 8,
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorSwatch: {
    alignItems: 'center',
    width: 60,
  },
  colorBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  colorName: {
    fontSize: 10,
    color: colors.neutral[600],
    marginTop: 4,
  },
  colorValue: {
    fontSize: 8,
    color: colors.neutral[400],
  },

  // Typography
  typoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  typoSample: {
    color: colors.neutral[900],
  },
  typoLabel: {
    fontSize: 12,
    color: colors.neutral[500],
  },

  // Spacing
  spacingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  spacingBox: {
    backgroundColor: colors.primary[500],
    borderRadius: 4,
  },
  spacingLabel: {
    fontSize: 14,
    color: colors.neutral[700],
  },

  // Border Radius
  radiusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  radiusItem: {
    alignItems: 'center',
  },
  radiusBox: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary[500],
  },
  radiusLabel: {
    fontSize: 12,
    color: colors.neutral[700],
    marginTop: 4,
  },
  radiusValue: {
    fontSize: 10,
    color: colors.neutral[500],
  },

  // Shadows
  shadowGrid: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 16,
  },
  shadowItem: {
    alignItems: 'center',
  },
  shadowBox: {
    width: 80,
    height: 80,
    backgroundColor: colors.neutral[0],
    borderRadius: 12,
  },
  shadowLabel: {
    fontSize: 14,
    color: colors.neutral[700],
    marginTop: 8,
  },
});
