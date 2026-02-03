import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Moon, Palette, Target, Dumbbell, Calendar, Clock, ChevronRight, Bell, Shield, User, LogOut } from 'lucide-react-native';
import { ListItem } from '../components/ListItem';
import { useTheme } from '../design-system';

/**
 * # ListItem
 *
 * Élément de liste pour les menus et paramètres.
 * **Supporte le Dark Mode** - utilise le sélecteur de background dans la toolbar.
 *
 * ## Types
 * - `navigation` : Avec chevron, cliquable pour naviguer
 * - `toggle` : Avec switch pour activer/désactiver
 * - `info` : Affiche une valeur, non cliquable
 *
 * ## Utilisation
 * - Écran de paramètres
 * - Menus de navigation
 * - Listes d'informations
 *
 * ## Props communes
 * - `icon` : ReactNode optionnel (icône Lucide)
 * - `title` : Texte principal
 * - `description` : Texte secondaire optionnel
 * - `showBorder` : Affiche une ligne de séparation (default: true)
 *
 * ## Tokens utilisés
 * - `colors.text.primary` : Title
 * - `colors.text.secondary` : Description et icône
 * - `colors.border.subtle` : Divider
 * - `colors.accent.default` : Switch actif
 */
const meta: Meta<typeof ListItem> = {
  title: 'Components/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, width: 350, backgroundColor: '#FBF8F3', borderRadius: 12 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Navigation: Story = {
  render: function Render() {
    const { colors } = useTheme();
    return (
      <ListItem
        type="navigation"
        icon={<User size={20} color={colors.text.secondary} strokeWidth={2} />}
        title="Mon profil"
        description="Modifier mes informations"
        onPress={() => console.log('Navigate to profile')}
        showBorder={false}
      />
    );
  },
};

export const Toggle: Story = {
  render: function Render() {
    const { colors } = useTheme();
    const [enabled, setEnabled] = useState(false);
    return (
      <ListItem
        type="toggle"
        icon={<Moon size={20} color={colors.text.secondary} strokeWidth={2} />}
        title="Mode sombre"
        description={enabled ? 'Activé' : 'Désactivé'}
        value={enabled}
        onValueChange={setEnabled}
        showBorder={false}
      />
    );
  },
};

export const Info: Story = {
  render: function Render() {
    const { colors } = useTheme();
    return (
      <ListItem
        type="info"
        icon={<Target size={20} color={colors.text.secondary} strokeWidth={2} />}
        title="Objectif"
        value="Semi-marathon"
        showBorder={false}
      />
    );
  },
};

export const SettingsSection: Story = {
  render: function Render() {
    const { colors } = useTheme();
    const [darkMode, setDarkMode] = useState(true);
    const [notifications, setNotifications] = useState(false);

    return (
      <View>
        <ListItem
          type="toggle"
          icon={<Moon size={20} color={colors.text.secondary} strokeWidth={2} />}
          title="Mode sombre"
          description={darkMode ? 'Activé' : 'Désactivé'}
          value={darkMode}
          onValueChange={setDarkMode}
        />
        <ListItem
          type="toggle"
          icon={<Bell size={20} color={colors.text.secondary} strokeWidth={2} />}
          title="Notifications"
          description={notifications ? 'Activées' : 'Désactivées'}
          value={notifications}
          onValueChange={setNotifications}
        />
        <ListItem
          type="info"
          icon={<Palette size={20} color={colors.text.secondary} strokeWidth={2} />}
          title="Thème"
          value="Warm Adult"
          showBorder={false}
        />
      </View>
    );
  },
};

export const ProfileSection: Story = {
  render: function Render() {
    const { colors } = useTheme();

    return (
      <View>
        <ListItem
          type="info"
          icon={<Target size={20} color={colors.text.secondary} strokeWidth={2} />}
          title="Objectif"
          value="Semi-marathon"
        />
        <ListItem
          type="info"
          icon={<Dumbbell size={20} color={colors.text.secondary} strokeWidth={2} />}
          title="Niveau"
          value="Intermédiaire"
        />
        <ListItem
          type="info"
          icon={<Calendar size={20} color={colors.text.secondary} strokeWidth={2} />}
          title="Fréquence"
          value="3 séances / semaine"
        />
        <ListItem
          type="info"
          icon={<Clock size={20} color={colors.text.secondary} strokeWidth={2} />}
          title="Durée du plan"
          value="12 semaines"
          showBorder={false}
        />
      </View>
    );
  },
};

export const NavigationMenu: Story = {
  render: function Render() {
    const { colors } = useTheme();

    return (
      <View>
        <ListItem
          type="navigation"
          icon={<User size={20} color={colors.text.secondary} strokeWidth={2} />}
          title="Mon profil"
          onPress={() => console.log('Profile')}
        />
        <ListItem
          type="navigation"
          icon={<Shield size={20} color={colors.text.secondary} strokeWidth={2} />}
          title="Confidentialité"
          onPress={() => console.log('Privacy')}
        />
        <ListItem
          type="navigation"
          icon={<Bell size={20} color={colors.text.secondary} strokeWidth={2} />}
          title="Notifications"
          onPress={() => console.log('Notifications')}
        />
        <ListItem
          type="navigation"
          icon={<LogOut size={20} color={colors.semantic.error} strokeWidth={2} />}
          title="Déconnexion"
          onPress={() => console.log('Logout')}
          showBorder={false}
        />
      </View>
    );
  },
};

export const WithoutIcon: Story = {
  render: function Render() {
    return (
      <View>
        <ListItem
          type="info"
          title="Version"
          value="1.0.0"
        />
        <ListItem
          type="navigation"
          title="Conditions d'utilisation"
          onPress={() => {}}
        />
        <ListItem
          type="navigation"
          title="Politique de confidentialité"
          onPress={() => {}}
          showBorder={false}
        />
      </View>
    );
  },
};
