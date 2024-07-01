import { Store } from '@tauri-apps/plugin-store';

export const APP_STORE_KEYSS = {
    RecentUsedLibPath: 'recent-used-lib-path',
};

export class AppSettingRepo {
    private store = new Store('viness-app-setting.bin');

    async getRecentUsedLibPath() {
        const path = await this.store.get(APP_STORE_KEYSS.RecentUsedLibPath);
        return path;
    }

    async setRecentUsedLibPath(path: string) {
        await this.store.set(APP_STORE_KEYSS.RecentUsedLibPath, path);
    }
}

export const appSettingRepo = new AppSettingRepo();
