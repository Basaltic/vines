import { Store } from '@tauri-apps/plugin-store';

export const appSettingsStore = await Store.load('viness-app-setting.bin');
