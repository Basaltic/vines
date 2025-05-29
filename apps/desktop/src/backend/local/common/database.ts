import { Low, type Adapter } from 'lowdb';
import { writeTextFile, readTextFile } from '@tauri-apps/plugin-fs';
import { Store } from '@tauri-apps/plugin-store';

export class TauriFileAdapter<T> implements Adapter<T> {
    constructor(private path: string) {}

    async read(): Promise<T | null> {
        try {
            const rawData = await readTextFile(this.path);
            if (rawData) {
                const data = JSON.parse(rawData);
                return data;
            }
        } catch (e) {
            console.log(e);
        }

        return null;
    }
    async write(data: T): Promise<void> {
        // window.requestIdleCallback()
        const rawData = JSON.stringify(data);
        return writeTextFile(this.path, rawData, { create: true });
    }
}

export class JSONDB<Data = unknown> extends Low<Data> {
    constructor(path: string, defaultData: Data) {
        const adapter = new TauriFileAdapter<Data>(path);
        super(adapter, defaultData);
    }
}

export const appSettingsStore = await Store.load('viness-app-setting.bin');
export const appOtherPersistInfoStore = await Store.load('viness-app-other-persist-info.bin');
