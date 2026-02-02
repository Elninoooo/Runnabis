import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from '../components';
import { colors, typography, spacing } from '../design-system';

interface OnboardingWelcomeProps {
  onGetStarted: () => void;
}

export function OnboardingWelcome({ onGetStarted }: OnboardingWelcomeProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>🏃</Text>
          <Text style={styles.title}>Runnabis</Text>
          <Text style={styles.subtitle}>
            Ton coach personnel pour préparer ton semi-marathon
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <FeatureItem
            emoji="📅"
            title="Plan personnalisé"
            description="Un programme adapté à ton niveau et tes disponibilités"
          />
          <FeatureItem
            emoji="🎯"
            title="Objectifs clairs"
            description="Des séances variées pour progresser efficacement"
          />
          <FeatureItem
            emoji="📊"
            title="Suivi simple"
            description="Valide tes séances et suis ta progression"
          />
        </View>
      </View>

      {/* CTA */}
      <View style={styles.footer}>
        <Button
          label="Commencer"
          onPress={onGetStarted}
          size="lg"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

// Composant pour afficher une feature
function FeatureItem({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureEmoji}>{emoji}</Text>
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[0],
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing['2xl'],
    paddingBottom: spacing.xl,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary[500],
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.neutral[600],
    textAlign: 'center',
    lineHeight: typography.fontSize.lg * typography.lineHeight.relaxed,
  },
  features: {
    marginTop: spacing.xl,
    gap: spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  featureEmoji: {
    fontSize: 32,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.neutral[900],
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: typography.fontSize.md,
    color: colors.neutral[600],
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
