import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  components,
} from '../../src/design-system';

/**
 * # Design System Tokens
 *
 * Les tokens de design de Runnabis — les valeurs fondamentales
 * qui définissent l'apparence de l'application.
 */
const meta: Meta = {
  title: 'Design System/Tokens',
};

export default meta;

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const ColorSwatch = ({
  name,
  color,
  showHex = true,
}: {
  name: string;
  color: string;
  showHex?: boolean;
}) => (
  <View style={styles.colorSwatch}>
    <View style={[styles.colorBox, { backgroundColor: color }]} />
    <Text style={styles.colorName}>{name}</Text>
    {showHex && <Text style={styles.colorValue}>{color}</Text>}
  </View>
);

const ColorRow = ({
  label,
  colors: colorList,
}: {
  label: string;
  colors: Record<string, string>;
}) => (
  <View style={styles.colorRow}>
    <Text style={styles.colorRowLabel}>{label}</Text>
    <View style={styles.swatchRow}>
      {Object.entries(colorList).map(([name, color]) => (
        <ColorSwatch key={name} name={name} color={color} />
      ))}
    </View>
  </View>
);

// =============================================================================
// STORIES
// =============================================================================

/**
 * ## Couleurs
 *
 * La palette de couleurs warm teal de Runnabis.
 */
export const Colors: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Couleurs</Text>
      <Text style={styles.description}>
        Palette "Warm Adult" — Teal chaleureux sur fond crème.
      </Text>

      <Section title="Backgrounds">
        <View style={styles.swatchRow}>
          {Object.entries(colors.background).map(([name, color]) => (
            <ColorSwatch key={name} name={name} color={color} />
          ))}
        </View>
      </Section>

      <Section title="Text">
        <View style={styles.swatchRow}>
          {Object.entries(colors.text).map(([name, color]) => (
            <ColorSwatch key={name} name={name} color={color} />
          ))}
        </View>
      </Section>

      <Section title="Accent (Teal)">
        <View style={styles.swatchRow}>
          {Object.entries(colors.accent).map(([name, color]) => (
            <ColorSwatch key={name} name={name} color={color} />
          ))}
        </View>
      </Section>

      <Section title="Semantic">
        <View style={styles.swatchRow}>
          <ColorSwatch name="success" color={colors.semantic.success} />
          <ColorSwatch name="successSoft" color={colors.semantic.successSoft} />
          <ColorSwatch name="error" color={colors.semantic.error} />
          <ColorSwatch name="errorSoft" color={colors.semantic.errorSoft} />
        </View>
        <View style={[styles.swatchRow, { marginTop: spacing.sm }]}>
          <ColorSwatch name="warning" color={colors.semantic.warning} />
          <ColorSwatch name="warningSoft" color={colors.semantic.warningSoft} />
        </View>
      </Section>

      <Section title="Borders">
        <View style={styles.swatchRow}>
          {Object.entries(colors.border).map(([name, color]) => (
            <ColorSwatch key={name} name={name} color={color} />
          ))}
        </View>
      </Section>

      <Section title="Workout Types">
        <View style={styles.swatchRow}>
          {Object.entries(colors.workout).map(([name, color]) => (
            <ColorSwatch key={name} name={name} color={color} />
          ))}
        </View>
      </Section>
    </ScrollView>
  ),
};

/**
 * ## Typographie
 *
 * L'échelle typographique de l'application.
 */
export const Typography: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Typographie</Text>
      <Text style={styles.description}>
        Hiérarchie claire avec System font pour les performances.
      </Text>

      <Section title="Échelle de texte">
        {Object.entries(typography.scale).map(([name, style]) => (
          <View key={name} style={styles.typoRow}>
            <Text
              style={[
                {
                  fontSize: style.fontSize,
                  fontWeight: style.fontWeight,
                  color: colors.text.primary,
                },
              ]}
            >
              {name}
            </Text>
            <Text style={styles.typoMeta}>
              {style.fontSize}px • {style.fontWeight} • {style.lineHeight}
            </Text>
          </View>
        ))}
      </Section>

      <Section title="Font Sizes">
        {Object.entries(typography.fontSize).map(([name, size]) => (
          <View key={name} style={styles.typoRow}>
            <Text style={[styles.typoSample, { fontSize: size }]}>Aa</Text>
            <Text style={styles.typoMeta}>
              {name} = {size}px
            </Text>
          </View>
        ))}
      </Section>

      <Section title="Font Weights">
        {Object.entries(typography.fontWeight).map(([name, weight]) => (
          <View key={name} style={styles.typoRow}>
            <Text style={[styles.typoSample, { fontWeight: weight }]}>Runnabis</Text>
            <Text style={styles.typoMeta}>
              {name} = {weight}
            </Text>
          </View>
        ))}
      </Section>
    </ScrollView>
  ),
};

/**
 * ## Espacements
 *
 * Échelle d'espacement basée sur 4px.
 */
export const Spacing: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Espacements</Text>
      <Text style={styles.description}>
        Unité de base : 4px. Utiliser les multiples pour la cohérence.
      </Text>

      <Section title="Échelle numérique">
        {Object.entries(spacing)
          .filter(([name]) => !isNaN(Number(name)))
          .map(([name, value]) => (
            <View key={name} style={styles.spacingRow}>
              <View
                style={[
                  styles.spacingBox,
                  { width: Math.min(value as number, 200), height: 24 },
                ]}
              />
              <Text style={styles.spacingLabel}>
                spacing.{name} = {value}px
              </Text>
            </View>
          ))}
      </Section>

      <Section title="Alias sémantiques">
        {Object.entries(spacing)
          .filter(([name]) => isNaN(Number(name)))
          .map(([name, value]) => (
            <View key={name} style={styles.spacingRow}>
              <View
                style={[
                  styles.spacingBox,
                  { width: Math.min(value as number, 200), height: 24 },
                ]}
              />
              <Text style={styles.spacingLabel}>
                spacing.{name} = {value}px
              </Text>
            </View>
          ))}
      </Section>
    </ScrollView>
  ),
};

/**
 * ## Border Radius
 *
 * Les arrondis pour une esthétique douce.
 */
export const BorderRadius: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Border Radius</Text>
      <Text style={styles.description}>
        Arrondis généreux pour une apparence friendly.
      </Text>

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
 * ## Ombres
 *
 * Ombres légères et subtiles.
 */
export const Shadows: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ombres</Text>
      <Text style={styles.description}>
        Ombres très légères pour une apparence épurée.
      </Text>

      <View style={styles.shadowGrid}>
        {Object.entries(shadows).map(([name, shadow]) => (
          <View key={name} style={styles.shadowItem}>
            <View style={[styles.shadowBox, shadow]} />
            <Text style={styles.shadowLabel}>{name}</Text>
            <Text style={styles.shadowMeta}>
              opacity: {shadow.shadowOpacity}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  ),
};

/**
 * ## Specs Composants
 *
 * Les dimensions des composants.
 */
export const ComponentSpecs: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Specs Composants</Text>
      <Text style={styles.description}>
        Dimensions et espacements prédéfinis pour les composants.
      </Text>

      <Section title="Buttons">
        {Object.entries(components.button).map(([name, specs]) => (
          <View key={name} style={styles.specRow}>
            <Text style={styles.specName}>{name}</Text>
            <View style={styles.specDetails}>
              <Text style={styles.specValue}>
                height: {specs.minHeight}px
              </Text>
              <Text style={styles.specValue}>
                padding: {specs.paddingVertical}/{specs.paddingHorizontal}px
              </Text>
              <Text style={styles.specValue}>
                radius: {specs.borderRadius}px
              </Text>
            </View>
          </View>
        ))}
      </Section>

      <Section title="Card">
        <View style={styles.specRow}>
          <Text style={styles.specName}>default</Text>
          <View style={styles.specDetails}>
            <Text style={styles.specValue}>padding: {components.card.padding}px</Text>
            <Text style={styles.specValue}>radius: {components.card.borderRadius}px</Text>
            <Text style={styles.specValue}>gap: {components.card.gap}px</Text>
          </View>
        </View>
      </Section>

      <Section title="Input">
        <View style={styles.specRow}>
          <Text style={styles.specName}>default</Text>
          <View style={styles.specDetails}>
            <Text style={styles.specValue}>height: {components.input.minHeight}px</Text>
            <Text style={styles.specValue}>padding: {components.input.paddingHorizontal}px</Text>
            <Text style={styles.specValue}>radius: {components.input.borderRadius}px</Text>
          </View>
        </View>
      </Section>
    </ScrollView>
  ),
};

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.background.primary,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },

  // Section
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },

  // Colors
  colorRow: {
    marginBottom: spacing.lg,
  },
  colorRowLabel: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  colorSwatch: {
    alignItems: 'center',
    width: 64,
  },
  colorBox: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  colorName: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginTop: 4,
    textAlign: 'center',
  },
  colorValue: {
    fontSize: 8,
    color: colors.text.muted,
    fontFamily: 'monospace',
  },

  // Typography
  typoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  typoSample: {
    color: colors.text.primary,
  },
  typoMeta: {
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
    fontFamily: 'monospace',
  },

  // Spacing
  spacingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  spacingBox: {
    backgroundColor: colors.accent.default,
    borderRadius: 4,
  },
  spacingLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontFamily: 'monospace',
  },

  // Border Radius
  radiusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  radiusItem: {
    alignItems: 'center',
  },
  radiusBox: {
    width: 56,
    height: 56,
    backgroundColor: colors.accent.default,
  },
  radiusLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
    marginTop: spacing.xs,
  },
  radiusValue: {
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
  },

  // Shadows
  shadowGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xl,
    marginTop: spacing.md,
  },
  shadowItem: {
    alignItems: 'center',
  },
  shadowBox: {
    width: 80,
    height: 80,
    backgroundColor: colors.background.surface,
    borderRadius: borderRadius.md,
  },
  shadowLabel: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginTop: spacing.sm,
  },
  shadowMeta: {
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
  },

  // Component Specs
  specRow: {
    backgroundColor: colors.background.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  specName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  specDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  specValue: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    backgroundColor: colors.background.muted,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: 'monospace',
  },
});
