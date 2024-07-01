import { exists, lstat, mkdir } from '@tauri-apps/plugin-fs';

export const LIBRARY_RAW_ASSETS_STORE_FOLDER_NAME = 'assets';

export class LibraryAssets {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    static async initialize(basePath: string) {
        const path = `${basePath}/${LIBRARY_RAW_ASSETS_STORE_FOLDER_NAME}`;

        const existed = await exists(path);

        if (!existed) {
            await mkdir(path);
        }

        return new LibraryAssets(path);
    }
}
