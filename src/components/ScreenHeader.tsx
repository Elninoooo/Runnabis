import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../design-system';
import { IconButton } from './IconButton';

interface ScreenHeaderProps {
  /** Titre de l'écran */
  title: string;
  /** Callback pour le bouton retour */
  onBack?: () => void;
  /** Actions à droite (IconButton) */
  rightAction?: React.ReactNode;
  /** Afficher une bordure en bas */
  showBorder?: boolean;
}

/**
 * ScreenHeader - En-tête d'écran avec navigation
 *
 * @example
 * ```tsx
 * <ScreenHeader
 *   title="Paramètres"
 *   onBack={() => navigation.goBack()}
 *   rightAction={
 *     <IconButton
 *       icon={<Settings size={20} color={colors.text.primary} />}
 *       onPress={onSettings}
 *       variant="ghost"
 *     />
 *   }
 * />
 * ```
 */
export function ScreenHeader({
  title,
  onBack,
  rightAction,
  showBorder = true,
}: ScreenHeaderProps) {
  const { colors, typography, spacing } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.md,
          borderBottomWidth: showBorder ? 1 : 0,
          borderBottomColor: colors.border.default,
          backgroundColor: colors.background.primary,
        },
      ]}
    >
      {/* Bouton retour */}
      <View style={styles.leftContainer}>
        {onBack ? (
          <IconButton
            icon={<ArrowLeft size={20} color={colors.text.primary} strokeWidth={2} />}
            onPress={onBack}
            variant="ghost"
            size="sm"
          />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      {/* Titre */}
      <Text
        style={[
          styles.title,
          {
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text.primary,
          },
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* Action à droite */}
      <View style={styles.rightContainer}>
        {rightAction || <View style={styles.placeholder} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  placeholder: {
    width: 32,
    height: 32,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
});
