import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../design-system';

/**
 * # Guidelines
 *
 * Les règles de design à suivre pour maintenir
 * la cohérence de l'interface Runnabis.
 */
const meta: Meta = {
  title: 'Branding/Guidelines',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const Rule = ({
  type,
  text,
  example,
}: {
  type: 'do' | 'dont';
  text: string;
  example?: string;
}) => (
  <View style={[styles.rule, type === 'do' ? styles.ruleDo : styles.ruleDont]}>
    <View style={styles.ruleHeader}>
      <View style={[styles.ruleIcon, type === 'do' ? styles.iconDo : styles.iconDont]}>
        <Text style={styles.ruleIconText}>{type === 'do' ? '✓' : '✗'}</Text>
      </View>
      <Text style={[styles.ruleType, type === 'do' ? styles.typeDo : styles.typeDont]}>
        {type === 'do' ? 'À FAIRE' : 'À ÉVITER'}
      </Text>
    </View>
    <Text style={styles.ruleText}>{text}</Text>
    {example && <Text style={styles.ruleExample}>"{example}"</Text>}
  </View>
);

export const TonDeVoix: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Ton de Voix</Text>
      <Text style={styles.pageDesc}>
        On tutoie l'utilisateur. On est un coach bienveillant, pas un sergent instructeur.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Comment on parle</Text>
        <Rule type="do" text="Salutations personnalisées" example="Salut Alex" />
        <Rule type="do" text="Questions engageantes" example="Prêt pour ta routine ?" />
        <Rule type="do" text="Encouragements doux" example="Continue !" />
        <Rule type="do" text="Félicitations sincères" example="Bien joué !" />
        <Rule type="do" text="Gratitude corporelle" example="Ton corps te remercie." />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ce qu'on évite</Text>
        <Rule type="dont" text="Ton corporate/formel" example="Bienvenue dans l'application" />
        <Rule type="dont" text="MAJUSCULES agressives" example="DÉMARRER L'ENTRAÎNEMENT" />
        <Rule type="dont" text="Promesses exagérées" example="Seulement 5 min pour transformer ton corps" />
        <Rule type="dont" text="Fitness bro culture" example="CRUSH YOUR GOALS" />
        <Rule type="dont" text="Culpabilisation" example="Tu n'as pas fait de sport depuis 3 jours..." />
      </View>
    </ScrollView>
  ),
};

export const ReglesVisuelles: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Règles Visuelles</Text>
      <Text style={styles.pageDesc}>
        Les règles d'or pour l'interface utilisateur.
      </Text>

      <View style={styles.section}>
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>JAMAIS d'emojis</Text>
          <Text style={styles.warningText}>
            Les emojis sont INTERDITS dans l'interface utilisateur.
            Ils sont trop enfantins pour notre direction "Warm Adult".
          </Text>
        </View>

        <Rule type="dont" text="Emojis dans les textes" example="Félicitations !" />
        <Rule type="dont" text="Emojis comme décoration" />
        <Rule type="do" text="Utiliser des icônes Lucide/Phosphor" />
        <Rule type="do" text="Utiliser des illustrations flat" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Icônes recommandées</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoItem}>• Lucide Icons (choix principal)</Text>
          <Text style={styles.infoItem}>• Phosphor Icons (Light weight)</Text>
          <Text style={styles.infoItem}>• Style : Outlined, pas filled</Text>
          <Text style={styles.infoItem}>• Stroke width : 2px</Text>
          <Text style={styles.infoItem}>• Tailles : 16px (sm), 20px (md), 24px (lg), 32px (xl)</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Illustrations</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoItem}>• Style : Flat, géométrique, silhouettes</Text>
          <Text style={styles.infoItem}>• Pas de visages détaillés</Text>
          <Text style={styles.infoItem}>• Couleurs : Utiliser les tokens du design system</Text>
          <Text style={styles.infoItem}>• Ambiance : Calme, zen, pas sportive agressive</Text>
        </View>
      </View>
    </ScrollView>
  ),
};

export const Direction: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Direction Créative</Text>
      <Text style={styles.pageDesc}>
        Notre positionnement "Warm Adult" entre Bend et Duolingo.
      </Text>

      <View style={styles.directionCard}>
        <Text style={styles.directionLabel}>« Warm Adult »</Text>
        <Text style={styles.directionDesc}>
          Chaleureux • Encourageant • Accessible • Adulte
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Les 4 piliers</Text>
        <View style={styles.pillarsGrid}>
          <View style={styles.pillar}>
            <Text style={styles.pillarTitle}>Chaleureux</Text>
            <Text style={styles.pillarDesc}>Accueillant et bienveillant</Text>
          </View>
          <View style={styles.pillar}>
            <Text style={styles.pillarTitle}>Encourageant</Text>
            <Text style={styles.pillarDesc}>Motivant sans être pushy</Text>
          </View>
          <View style={styles.pillar}>
            <Text style={styles.pillarTitle}>Accessible</Text>
            <Text style={styles.pillarDesc}>Simple et compréhensible</Text>
          </View>
          <View style={styles.pillar}>
            <Text style={styles.pillarTitle}>Adulte</Text>
            <Text style={styles.pillarDesc}>Mature et respectueux</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Positionnement</Text>
        <View style={styles.positioningContainer}>
          <Text style={styles.positionLabel}>Bend (minimal)</Text>
          <View style={styles.positionBar}>
            <View style={styles.positionMarker} />
          </View>
          <Text style={styles.positionLabel}>Duolingo (playful)</Text>
        </View>
        <Text style={styles.positionCaption}>
          Plus proche de Bend que de Duolingo
        </Text>
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

  // Rules
  rule: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderLeftWidth: 4,
  },
  ruleDo: {
    backgroundColor: colors.semantic.successSoft,
    borderLeftColor: colors.semantic.success,
  },
  ruleDont: {
    backgroundColor: colors.semantic.errorSoft,
    borderLeftColor: colors.semantic.error,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  ruleIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
  },
  iconDo: {
    backgroundColor: colors.semantic.success,
  },
  iconDont: {
    backgroundColor: colors.semantic.error,
  },
  ruleIconText: {
    color: colors.text.inverse,
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
  },
  ruleType: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: 0.5,
  },
  typeDo: {
    color: colors.semantic.success,
  },
  typeDont: {
    color: colors.semantic.error,
  },
  ruleText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  ruleExample: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontStyle: 'italic',
    marginTop: 4,
  },

  // Warning Box
  warningBox: {
    backgroundColor: colors.semantic.warningSoft,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.semantic.warning,
  },
  warningTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: '#B8860B',
    marginBottom: spacing.xs,
  },
  warningText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    lineHeight: 22,
  },

  // Info Card
  infoCard: {
    backgroundColor: colors.background.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  infoItem: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    lineHeight: 28,
  },

  // Direction
  directionCard: {
    backgroundColor: colors.accent.soft,
    padding: spacing.xl,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent.default,
  },
  directionLabel: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.accent.default,
    marginBottom: spacing.xs,
  },
  directionDesc: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
  },

  // Pillars
  pillarsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  pillar: {
    width: '48%',
    backgroundColor: colors.background.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  pillarTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  pillarDesc: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },

  // Positioning
  positioningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  positionLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
    width: 100,
  },
  positionBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.background.muted,
    borderRadius: 4,
    marginHorizontal: spacing.sm,
  },
  positionMarker: {
    width: 16,
    height: 16,
    backgroundColor: colors.accent.default,
    borderRadius: 8,
    position: 'absolute',
    top: -4,
    left: '30%',
  },
  positionCaption: {
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
