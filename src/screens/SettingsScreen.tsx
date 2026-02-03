import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Button } from '../components';
import { useTheme } from '../design-system';
import { ThemeMode } from '../design-system/theme';
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
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border.default }]}>
        <Button label="← Retour" onPress={onBack} variant="ghost" size="sm" />
        <Text style={[styles.headerTitle, { fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, color: colors.text.primary }]}>
          Paramètres
        </Text>
        <View style={styles.headerSpacer} />
      </View>

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
            <TouchableOpacity
              style={[styles.settingRow, { padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border.subtle }]}
              onPress={handleThemeToggle}
              activeOpacity={0.7}
            >
              <View style={styles.settingInfo}>
                <Text style={{ fontSize: 24, marginRight: spacing.md }}>🌙</Text>
                <View>
                  <Text style={[styles.settingLabel, { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.medium, color: colors.text.primary }]}>
                    Mode sombre
                  </Text>
                  <Text style={[styles.settingDescription, { fontSize: typography.fontSize.sm, color: colors.text.muted, marginTop: 2 }]}>
                    {isDarkMode ? 'Activé' : 'Désactivé'}
                  </Text>
                </View>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={handleThemeToggle}
                trackColor={{ false: colors.background.muted, true: colors.accent.default }}
                thumbColor={colors.background.surface}
              />
            </TouchableOpacity>

            <View style={[styles.settingRow, { padding: spacing.md }]}>
              <View style={styles.settingInfo}>
                <Text style={{ fontSize: 24, marginRight: spacing.md }}>🎨</Text>
                <View>
                  <Text style={[styles.settingLabel, { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.medium, color: colors.text.primary }]}>
                    Thème
                  </Text>
                  <Text style={[styles.settingDescription, { fontSize: typography.fontSize.sm, color: colors.text.muted, marginTop: 2 }]}>
                    Warm Adult (Teal & Crème)
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Section Profil */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: colors.text.muted, marginBottom: spacing.md, textTransform: 'uppercase', letterSpacing: 1 }]}>
            Mon profil
          </Text>

          <View style={[styles.card, { backgroundColor: colors.background.surface, borderRadius: borderRadius.lg, overflow: 'hidden' }]}>
            <View style={[styles.profileRow, { padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border.subtle }]}>
              <Text style={{ fontSize: 24, marginRight: spacing.md }}>🎯</Text>
              <View style={styles.profileInfo}>
                <Text style={[styles.profileLabel, { fontSize: typography.fontSize.sm, color: colors.text.muted }]}>
                  Objectif
                </Text>
                <Text style={[styles.profileValue, { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.medium, color: colors.text.primary }]}>
                  {getRaceLabel()}
                </Text>
              </View>
            </View>

            <View style={[styles.profileRow, { padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border.subtle }]}>
              <Text style={{ fontSize: 24, marginRight: spacing.md }}>💪</Text>
              <View style={styles.profileInfo}>
                <Text style={[styles.profileLabel, { fontSize: typography.fontSize.sm, color: colors.text.muted }]}>
                  Niveau
                </Text>
                <Text style={[styles.profileValue, { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.medium, color: colors.text.primary }]}>
                  {getLevelLabel()}
                </Text>
              </View>
            </View>

            <View style={[styles.profileRow, { padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border.subtle }]}>
              <Text style={{ fontSize: 24, marginRight: spacing.md }}>📅</Text>
              <View style={styles.profileInfo}>
                <Text style={[styles.profileLabel, { fontSize: typography.fontSize.sm, color: colors.text.muted }]}>
                  Fréquence
                </Text>
                <Text style={[styles.profileValue, { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.medium, color: colors.text.primary }]}>
                  {profile.weeklyFrequency} séances / semaine
                </Text>
              </View>
            </View>

            <View style={[styles.profileRow, { padding: spacing.md }]}>
              <Text style={{ fontSize: 24, marginRight: spacing.md }}>⏱️</Text>
              <View style={styles.profileInfo}>
                <Text style={[styles.profileLabel, { fontSize: typography.fontSize.sm, color: colors.text.muted }]}>
                  Durée du plan
                </Text>
                <Text style={[styles.profileValue, { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.medium, color: colors.text.primary }]}>
                  {profile.trainingWeeks} semaines
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Section Données */}
        {onResetOnboarding && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: colors.text.muted, marginBottom: spacing.md, textTransform: 'uppercase', letterSpacing: 1 }]}>
              Données
            </Text>

            <View style={[styles.card, { backgroundColor: colors.background.surface, borderRadius: borderRadius.lg, padding: spacing.md }]}>
              <Button
                label="Recommencer l'onboarding"
                onPress={onResetOnboarding}
                variant="secondary"
                fullWidth
              />
              <Text style={[styles.warningText, { fontSize: typography.fontSize.xs, color: colors.text.muted, textAlign: 'center', marginTop: spacing.sm }]}>
                Cela réinitialisera ton plan d'entraînement
              </Text>
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={[styles.footer, { paddingTop: spacing.lg }]}>
          <Text style={[styles.version, { fontSize: typography.fontSize.sm, color: colors.text.muted, textAlign: 'center' }]}>
            Runnabis v1.0.0
          </Text>
          <Text style={[styles.copyright, { fontSize: typography.fontSize.xs, color: colors.text.muted, textAlign: 'center', marginTop: spacing.xs }]}>
            Fait avec ❤️ pour les coureurs
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {},
  headerSpacer: {
    width: 80, // Pour équilibrer le bouton retour
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

  // Setting row
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {},
  settingDescription: {},

  // Profile row
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileLabel: {},
  profileValue: {},

  // Warning
  warningText: {},

  // Footer
  footer: {},
  version: {},
  copyright: {},
});
