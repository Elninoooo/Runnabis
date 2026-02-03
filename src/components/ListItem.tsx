import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '../design-system';

interface ListItemBaseProps {
  /** Icône à gauche (composant Lucide) */
  icon?: React.ReactNode;
  /** Titre principal */
  title: string;
  /** Description secondaire */
  description?: string;
  /** Désactivé */
  disabled?: boolean;
  /** Bordure en bas */
  showBorder?: boolean;
}

interface ListItemNavigationProps extends ListItemBaseProps {
  /** Type: navigation - affiche une flèche */
  type: 'navigation';
  /** Callback au press */
  onPress: () => void;
}

interface ListItemToggleProps extends ListItemBaseProps {
  /** Type: toggle - affiche un switch */
  type: 'toggle';
  /** Valeur du switch */
  value: boolean;
  /** Callback au changement */
  onValueChange: (value: boolean) => void;
}

interface ListItemInfoProps extends ListItemBaseProps {
  /** Type: info - affiche une valeur à droite */
  type: 'info';
  /** Valeur affichée à droite */
  value: string;
}

type ListItemProps = ListItemNavigationProps | ListItemToggleProps | ListItemInfoProps;

/**
 * ListItem - Élément de liste pour les settings et menus
 *
 * @example
 * ```tsx
 * // Navigation
 * <ListItem
 *   type="navigation"
 *   icon={<User size={20} color={colors.text.primary} />}
 *   title="Mon profil"
 *   onPress={() => navigate('profile')}
 * />
 *
 * // Toggle
 * <ListItem
 *   type="toggle"
 *   icon={<Moon size={20} color={colors.text.primary} />}
 *   title="Mode sombre"
 *   value={isDark}
 *   onValueChange={setIsDark}
 * />
 *
 * // Info
 * <ListItem
 *   type="info"
 *   icon={<Palette size={20} color={colors.text.primary} />}
 *   title="Thème"
 *   value="Warm Adult"
 * />
 * ```
 */
export function ListItem(props: ListItemProps) {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const { icon, title, description, disabled = false, showBorder = true } = props;

  const content = (
    <View
      style={[
        styles.container,
        {
          padding: spacing.md,
          borderBottomWidth: showBorder ? 1 : 0,
          borderBottomColor: colors.border.subtle,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      {/* Icône */}
      {icon && <View style={[styles.iconContainer, { marginRight: spacing.md }]}>{icon}</View>}

      {/* Texte */}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            {
              fontSize: typography.fontSize.md,
              fontWeight: typography.fontWeight.medium,
              color: colors.text.primary,
            },
          ]}
        >
          {title}
        </Text>
        {description && (
          <Text
            style={[
              styles.description,
              {
                fontSize: typography.fontSize.sm,
                color: colors.text.muted,
                marginTop: 2,
              },
            ]}
          >
            {description}
          </Text>
        )}
      </View>

      {/* Action à droite */}
      {props.type === 'navigation' && (
        <ChevronRight size={20} color={colors.text.muted} />
      )}

      {props.type === 'toggle' && (
        <Switch
          value={props.value}
          onValueChange={props.onValueChange}
          disabled={disabled}
          trackColor={{ false: colors.background.muted, true: colors.accent.default }}
          thumbColor={colors.background.surface}
        />
      )}

      {props.type === 'info' && (
        <Text
          style={[
            styles.value,
            {
              fontSize: typography.fontSize.sm,
              color: colors.text.muted,
            },
          ]}
        >
          {props.value}
        </Text>
      )}
    </View>
  );

  if (props.type === 'navigation') {
    return (
      <TouchableOpacity onPress={props.onPress} disabled={disabled} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  if (props.type === 'toggle') {
    return (
      <TouchableOpacity
        onPress={() => props.onValueChange(!props.value)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {},
  description: {},
  value: {},
});
