import { exists } from '@tauri-apps/plugin-fs';
import { JSONDB } from '../common/database';
import { generateId } from '@/common/util/id';

export interface ILibraryInfo {
    id: string;
    name: string;
    version: string;
}

export const initialLibraryInfo = {
    id: '',
    name: '',
    version: '0.0.1',
};

export const LIBRARY_SETTING_STORE_FILE = 'viness.json';

export class LibraryInfo {
    private db: JSONDB<ILibraryInfo>;
    private info: ILibraryInfo;

    constructor(db: JSONDB<ILibraryInfo>) {
        this.db = db;
        this.info = db.data;
    }

    static async initialize(basePath: string, name: string) {
        const path = `${basePath}/${LIBRARY_SETTING_STORE_FILE}`;
        const existed = await exists(path);

        let db: JSONDB<ILibraryInfo>;
        if (!existed) {
            const defaultInfo = { ...initialLibraryInfo, name, id: generateId() };
            db = new JSONDB<ILibraryInfo>(path, defaultInfo);
            await db.write();
        } else {
            db = new JSONDB<ILibraryInfo>(path, initialLibraryInfo);
            await db.read();
        }

        return new LibraryInfo(db);
    }

    get() {
        return this.info;
    }

    async update(info: Partial<ILibraryInfo>) {
        return this.db.update((data) => {
            // biome-ignore lint/complexity/noForEach: <explanation>
            Object.keys(info).forEach((key) => {
                data[key] = info[key];
            });
        });
    }
}




node -> local file ? x