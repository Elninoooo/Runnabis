import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from '../components';
import { useTheme } from '../design-system';

interface OnboardingWelcomeProps {
  onGetStarted: () => void;
}

export function OnboardingWelcome({ onGetStarted }: OnboardingWelcomeProps) {
  const { colors, typography, spacing } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={[styles.content, { paddingHorizontal: spacing.lg }]}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: spacing['2xl'], paddingBottom: spacing.xl }]}>
          <Text style={styles.emoji}>🏃</Text>
          <Text style={[
            styles.title,
            {
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.accent.default,
              marginBottom: spacing.sm,
            }
          ]}>
            Runnabis
          </Text>
          <Text style={[
            styles.subtitle,
            {
              fontSize: typography.fontSize.lg,
              color: colors.text.secondary,
              lineHeight: typography.fontSize.lg * typography.lineHeight.relaxed,
            }
          ]}>
            Ton coach personnel pour préparer ton semi-marathon
          </Text>
        </View>

        {/* Features */}
        <View style={[styles.features, { marginTop: spacing.xl, gap: spacing.lg }]}>
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
      <View style={[styles.footer, { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }]}>
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
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.featureItem, { gap: spacing.md }]}>
      <Text style={styles.featureEmoji}>{emoji}</Text>
      <View style={styles.featureText}>
        <Text style={[
          styles.featureTitle,
          {
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
            marginBottom: spacing.xs,
          }
        ]}>
          {title}
        </Text>
        <Text style={[
          styles.featureDescription,
          {
            fontSize: typography.fontSize.md,
            color: colors.text.secondary,
            lineHeight: typography.fontSize.md * typography.lineHeight.normal,
          }
        ]}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {},
  subtitle: {
    textAlign: 'center',
  },
  features: {},
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureEmoji: {
    fontSize: 32,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {},
  featureDescription: {},
  footer: {},
});
