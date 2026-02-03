import { registerRootComponent } from 'expo';
import { SHOW_STORYBOOK } from './app.config';

import App from './App';
import StorybookUIRoot from './.rnstorybook';

/**
 * Point d'entrée de l'application
 *
 * Pour basculer vers Storybook :
 * 1. Ouvre app.config.ts
 * 2. Mets SHOW_STORYBOOK à true
 * 3. Recharge l'app (secoue le téléphone → Reload)
 */
const RootComponent = SHOW_STORYBOOK ? StorybookUIRoot : App;

registerRootComponent(RootComponent);
