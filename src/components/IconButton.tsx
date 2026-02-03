import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../design-system';

interface IconButtonProps {
  /** L'icône à afficher (composant Lucide) */
  icon: React.ReactNode;
  /** Callback au press */
  onPress: () => void;
  /** Variante du bouton */
  variant?: 'default' | 'ghost' | 'muted';
  /** Taille du bouton */
  size?: 'sm' | 'md' | 'lg';
  /** Désactivé */
  disabled?: boolean;
  /** Style additionnel */
  style?: ViewStyle;
}

/**
 * IconButton - Bouton avec icône uniquement
 *
 * Utilisé pour les actions de navigation, settings, etc.
 *
 * @example
 * ```tsx
 * import { ArrowLeft, Settings } from 'lucide-react-native';
 *
 * <IconButton
 *   icon={<ArrowLeft size={20} color={colors.text.primary} />}
 *   onPress={onBack}
 * />
 * ```
 */
export function IconButton({
  icon,
  onPress,
  variant = 'default',
  size = 'md',
  disabled = false,
  style,
}: IconButtonProps) {
  const { colors, borderRadius } = useTheme();

  const sizeStyles = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 48, height: 48 },
  };

  const variantStyles = {
    default: {
      backgroundColor: colors.background.surface,
      borderWidth: 1,
      borderColor: colors.border.default,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderColor: 'transparent',
    },
    muted: {
      backgroundColor: colors.background.muted,
      borderWidth: 0,
      borderColor: 'transparent',
    },
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        sizeStyles[size],
        variantStyles[variant],
        { borderRadius: borderRadius.lg },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
