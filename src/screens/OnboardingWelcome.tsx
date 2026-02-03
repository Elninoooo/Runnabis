import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Calendar, Target, TrendingUp } from 'lucide-react-native';
import { Button, Card } from '../components';
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
        <View style={[styles.features, { marginTop: spacing.xl, gap: spacing.md }]}>
          <FeatureItem
            icon={<Calendar size={24} color={colors.accent.default} strokeWidth={2} />}
            title="Plan personnalisé"
            description="Un programme adapté à ton niveau et tes disponibilités"
          />
          <FeatureItem
            icon={<Target size={24} color={colors.accent.default} strokeWidth={2} />}
            title="Objectifs clairs"
            description="Des séances variées pour progresser efficacement"
          />
          <FeatureItem
            icon={<TrendingUp size={24} color={colors.accent.default} strokeWidth={2} />}
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
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <Card variant="filled" padding="md">
      <View style={[styles.featureItem, { gap: spacing.md }]}>
        <View style={[
          styles.featureIconContainer,
          {
            width: 48,
            height: 48,
            borderRadius: borderRadius.lg,
            backgroundColor: colors.accent.soft,
          }
        ]}>
          {icon}
        </View>
        <View style={styles.featureText}>
          <Text style={[
            styles.featureTitle,
            {
              fontSize: typography.fontSize.md,
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
              fontSize: typography.fontSize.sm,
              color: colors.text.secondary,
              lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
            }
          ]}>
            {description}
          </Text>
        </View>
      </View>
    </Card>
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
  title: {},
  subtitle: {
    textAlign: 'center',
  },
  features: {},
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {},
  featureDescription: {},
  footer: {},
});
