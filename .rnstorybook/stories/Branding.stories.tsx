import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../src/design-system';

/**
 * # Branding Runnabis
 *
 * Documentation de l'identité de marque et des guidelines.
 * Direction : "Warm Adult" — Chaleureux, Encourageant, Accessible, Adulte
 */
const meta: Meta = {
  title: 'Branding/Guidelines',
};

export default meta;

// Composant Section
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

// Composant Rule
const Rule = ({
  type,
  text,
  example
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
    {example && (
      <Text style={styles.ruleExample}>"{example}"</Text>
    )}
  </View>
);

/**
 * ## Direction Créative
 *
 * Notre positionnement "Warm Adult" entre Bend (minimal) et Duolingo (playful).
 */
export const Direction: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Direction Créative</Text>
      <Text style={styles.subtitle}>« Warm Adult »</Text>

      <Text style={styles.description}>
        Runnabis se positionne entre le minimalisme de Bend et le côté playful de Duolingo.
        Notre objectif : être chaleureux et encourageant, tout en restant adulte et professionnel.
      </Text>

      <Section title="Les 4 piliers">
        <View style={styles.pillarsGrid}>
          <View style={styles.pillar}>
            <Text style={styles.pillarEmoji}>☀️</Text>
            <Text style={styles.pillarTitle}>Chaleureux</Text>
            <Text style={styles.pillarDesc}>Accueillant et bienveillant</Text>
          </View>
          <View style={styles.pillar}>
            <Text style={styles.pillarEmoji}>💪</Text>
            <Text style={styles.pillarTitle}>Encourageant</Text>
            <Text style={styles.pillarDesc}>Motivant sans être pushy</Text>
          </View>
          <View style={styles.pillar}>
            <Text style={styles.pillarEmoji}>🚪</Text>
            <Text style={styles.pillarTitle}>Accessible</Text>
            <Text style={styles.pillarDesc}>Simple et compréhensible</Text>
          </View>
          <View style={styles.pillar}>
            <Text style={styles.pillarEmoji}>🎯</Text>
            <Text style={styles.pillarTitle}>Adulte</Text>
            <Text style={styles.pillarDesc}>Mature et respectueux</Text>
          </View>
        </View>
      </Section>

      <Section title="Positionnement">
        <View style={styles.positioningBar}>
          <Text style={styles.positionLabel}>Bend</Text>
          <View style={styles.positionScale}>
            <View style={styles.positionMarker} />
          </View>
          <Text style={styles.positionLabel}>Duolingo</Text>
        </View>
        <Text style={styles.positionCaption}>
          Plus proche de Bend (minimal) que de Duolingo (playful)
        </Text>
      </Section>
    </ScrollView>
  ),
};

/**
 * ## Ton de Voix
 *
 * Comment on parle à nos utilisateurs.
 */
export const TonDeVoix: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ton de Voix</Text>
      <Text style={styles.description}>
        On tutoie l'utilisateur. On est un coach bienveillant, pas un sergent instructeur.
      </Text>

      <Section title="Comment on parle">
        <Rule type="do" text="Salutations personnalisées" example="Salut Alex" />
        <Rule type="do" text="Questions engageantes" example="Prêt pour ta routine ?" />
        <Rule type="do" text="Encouragements doux" example="Continue !" />
        <Rule type="do" text="Félicitations sincères" example="Bien joué !" />
        <Rule type="do" text="Gratitude corporelle" example="Ton corps te remercie." />
      </Section>

      <Section title="Ce qu'on évite">
        <Rule type="dont" text="Ton corporate/formel" example="Bienvenue dans l'application" />
        <Rule type="dont" text="MAJUSCULES agressives" example="DÉMARRER L'ENTRAÎNEMENT" />
        <Rule type="dont" text="Promesses exagérées" example="Seulement 5 min pour transformer ton corps" />
        <Rule type="dont" text="Fitness bro culture" example="CRUSH YOUR GOALS" />
        <Rule type="dont" text="Culpabilisation" example="Tu n'as pas fait de sport depuis 3 jours..." />
      </Section>
    </ScrollView>
  ),
};

/**
 * ## Règles Visuelles
 *
 * Les règles d'or pour l'interface.
 */
export const ReglesVisuelles: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Règles Visuelles</Text>

      <Section title="JAMAIS d'emojis">
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>Règle d'or</Text>
          <Text style={styles.warningText}>
            Les emojis sont INTERDITS dans l'interface utilisateur.
            Ils sont trop enfantins pour notre direction "Warm Adult".
          </Text>
        </View>

        <Rule type="dont" text="Emojis dans les textes" example="🎉 Félicitations !" />
        <Rule type="dont" text="Emojis comme décoration" />
        <Rule type="do" text="Utiliser des icônes Lucide/Phosphor" />
        <Rule type="do" text="Utiliser des illustrations flat" />
      </Section>

      <Section title="Icônes recommandées">
        <Text style={styles.paragraph}>
          • Lucide Icons (choix principal){'\n'}
          • Phosphor Icons (Light weight){'\n'}
          • Style : Outlined, pas filled{'\n'}
          • Stroke width : 2px{'\n'}
          • Tailles : 16px (sm), 20px (md), 24px (lg), 32px (xl)
        </Text>
      </Section>

      <Section title="Illustrations">
        <Text style={styles.paragraph}>
          • Style : Flat, géométrique, silhouettes{'\n'}
          • Pas de visages détaillés{'\n'}
          • Couleurs : Utiliser les tokens du design system{'\n'}
          • Ambiance : Calme, zen, pas sportive agressive
        </Text>
      </Section>
    </ScrollView>
  ),
};

/**
 * ## Couleurs par Type d'Entraînement
 *
 * Chaque type d'entraînement a sa couleur distinctive.
 */
export const WorkoutColors: StoryObj = {
  render: () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Couleurs d'Entraînement</Text>
      <Text style={styles.description}>
        Chaque type de séance a sa couleur pour une identification rapide.
      </Text>

      <View style={styles.workoutList}>
        {[
          { name: 'Endurance fondamentale', color: '#DCE8E0', desc: 'Séances longues, récup active' },
          { name: 'Fractionné', color: '#F2E0DC', desc: 'Intervalles, haute intensité' },
          { name: 'Allure spécifique', color: '#DCE0E8', desc: 'À l\'allure cible' },
          { name: 'Sortie longue', color: '#E8E4D8', desc: 'Longues distances' },
          { name: 'Récupération', color: '#E4DCE8', desc: 'Récup, étirements' },
        ].map((item) => (
          <View key={item.name} style={styles.workoutItem}>
            <View style={[styles.workoutColor, { backgroundColor: item.color }]} />
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutName}>{item.name}</Text>
              <Text style={styles.workoutDesc}>{item.desc}</Text>
              <Text style={styles.workoutHex}>{item.color}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  ),
};

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
  subtitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.medium,
    color: colors.accent.default,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  paragraph: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    lineHeight: 24,
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

  // Pillars
  pillarsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  pillar: {
    width: '47%',
    backgroundColor: colors.background.surface,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  pillarEmoji: {
    fontSize: 24,
    marginBottom: spacing.xs,
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
  positioningBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  positionLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
    width: 70,
  },
  positionScale: {
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

  // Rules
  rule: {
    padding: spacing.md,
    borderRadius: 12,
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
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.semantic.warning,
  },
  warningTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.semantic.warning,
    marginBottom: spacing.xs,
  },
  warningText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    lineHeight: 22,
  },

  // Workout Colors
  workoutList: {
    gap: spacing.sm,
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.surface,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  workoutColor: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: spacing.md,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  workoutDesc: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: 2,
  },
  workoutHex: {
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
    fontFamily: 'monospace',
    marginTop: 4,
  },
});
