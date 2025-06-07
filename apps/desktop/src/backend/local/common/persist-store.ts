import type { IAppSettings } from '@/backend/domain/app';
import { Store } from '@tauri-apps/plugin-store';

export class LocalStore<T extends object> {
    private store: Store;

    constructor(store: Store) {
        this.store = store;
    }

    static async create<T extends object>(name: string) {
        const store = await Store.load(name);
        return new LocalStore<T>(store);
    }

    async set<K extends keyof T>(key: K, value: T[K]): Promise<void> {
        await this.store.set(key as any, value);
        this.autoSave();
        return;
    }

    async get<K extends keyof T>(key: K): Promise<T[K]> {
        return this.store.get(key as any);
    }

    private autoSave() {
        requestIdleCallback(() => {
            this.store.save();
        });
    }
}

const store = await LocalStore.create<IAppSettings>('test');
