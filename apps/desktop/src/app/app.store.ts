import { createStore } from '@viness/store';

export interface AppGlobalSettings {
    theme?: string;
    language?: string;
}

const DEFAULT_APP_GLOBAL_SETTINGS: AppGlobalSettings = {};

export const appSettingsStore = createStore({ defaultState: DEFAULT_APP_GLOBAL_SETTINGS });
