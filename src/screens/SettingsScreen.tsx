import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Moon, Palette, Target, Dumbbell, Calendar, Clock, RotateCcw } from 'lucide-react-native';
import { Button, ScreenHeader, ListItem } from '../components';
import { useTheme } from '../design-system';
import { UserProfile } from '../types';

interface SettingsScreenProps {
  /** Profil utilisateur */
  profile: UserProfile;
  /** Retour à l'écran précédent */
  onBack: () => void;
  /** Réinitialiser l'onboarding */
  onResetOnboarding?: () => void;
}

/**
 * SettingsScreen - Écran des paramètres
 */
export function SettingsScreen({
  profile,
  onBack,
  onResetOnboarding,
}: SettingsScreenProps) {
  const { colors, typography, spacing, borderRadius, mode, setMode } = useTheme();

  const isDarkMode = mode === 'dark';

  const handleThemeToggle = () => {
    setMode(isDarkMode ? 'light' : 'dark');
  };

  const getRaceLabel = () => {
    switch (profile.raceType) {
      case '5K': return '5 kilomètres';
      case '10K': return '10 kilomètres';
      case 'semi-marathon': return 'Semi-marathon';
      case 'marathon': return 'Marathon';
      default: return profile.raceType;
    }
  };

  const getLevelLabel = () => {
    switch (profile.level) {
      case 'debutant': return 'Débutant';
      case 'intermediaire': return 'Intermédiaire';
      case 'avance': return 'Avancé';
      default: return profile.level;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <ScreenHeader
        title="Paramètres"
        onBack={onBack}
        showBorder
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.contentContainer, { padding: spacing.lg, gap: spacing['2xl'] }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Apparence */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: colors.text.muted, marginBottom: spacing.md, textTransform: 'uppercase', letterSpacing: 1 }]}>
            Apparence
          </Text>

          <View style={[styles.card, { backgroundColor: colors.background.surface, borderRadius: borderRadius.lg, overflow: 'hidden' }]}>
            <ListItem
              type="toggle"
              icon={<Moon size={20} color={colors.text.secondary} strokeWidth={2} />}
              title="Mode sombre"
              description={isDarkMode ? 'Activé' : 'Désactivé'}
              value={isDarkMode}
              onValueChange={handleThemeToggle}
            />

            <ListItem
              type="info"
              icon={<Palette size={20} color={colors.text.secondary} strokeWidth={2} />}
              title="Thème"
              value="Warm Adult"
              showBorder={false}
            />
          </View>
        </View>

        {/* Section Profil */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: colors.text.muted, marginBottom: spacing.md, textTransform: 'uppercase', letterSpacing: 1 }]}>
            Mon profil
          </Text>

          <View style={[styles.card, { backgroundColor: colors.background.surface, borderRadius: borderRadius.lg, overflow: 'hidden' }]}>
            <ListItem
              type="info"
              icon={<Target size={20} color={colors.text.secondary} strokeWidth={2} />}
              title="Objectif"
              value={getRaceLabel()}
            />

            <ListItem
              type="info"
              icon={<Dumbbell size={20} color={colors.text.secondary} strokeWidth={2} />}
              title="Niveau"
              value={getLevelLabel()}
            />

            <ListItem
              type="info"
              icon={<Calendar size={20} color={colors.text.secondary} strokeWidth={2} />}
              title="Fréquence"
              value={`${profile.weeklyFrequency} séances / semaine`}
            />

            <ListItem
              type="info"
              icon={<Clock size={20} color={colors.text.secondary} strokeWidth={2} />}
              title="Durée du plan"
              value={`${profile.trainingWeeks} semaines`}
              showBorder={false}
            />
          </View>
        </View>

        {/* Section Données */}
        {onResetOnboarding && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: colors.text.muted, marginBottom: spacing.md, textTransform: 'uppercase', letterSpacing: 1 }]}>
              Données
            </Text>

            <View style={[styles.card, { backgroundColor: colors.background.surface, borderRadius: borderRadius.lg, overflow: 'hidden' }]}>
              <ListItem
                type="navigation"
                icon={<RotateCcw size={20} color={colors.semantic.error} strokeWidth={2} />}
                title="Recommencer l'onboarding"
                description="Réinitialise ton plan d'entraînement"
                onPress={onResetOnboarding}
                showBorder={false}
              />
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={[styles.footer, { paddingTop: spacing.lg }]}>
          <Text style={[styles.version, { fontSize: typography.fontSize.sm, color: colors.text.muted, textAlign: 'center' }]}>
            Runnabis v1.0.0
          </Text>
          <Text style={[styles.copyright, { fontSize: typography.fontSize.xs, color: colors.text.muted, textAlign: 'center', marginTop: spacing.xs }]}>
            Fait avec soin pour les coureurs
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {},

  // Section
  section: {},
  sectionTitle: {},

  // Card
  card: {},

  // Footer
  footer: {},
  version: {},
  copyright: {},
});
