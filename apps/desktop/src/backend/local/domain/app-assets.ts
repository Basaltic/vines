import { exists, mkdir } from '@tauri-apps/plugin-fs';
import { APP_RAW_ASSETS_STORE_FOLDER_NAME } from '../common/constants';

export class AppAssets {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    static async create(basePath: string) {
        const path = `${basePath}/${APP_RAW_ASSETS_STORE_FOLDER_NAME}`;

        const existed = await exists(path);

        if (!existed) {
            await mkdir(path);
        }

        return new AppAssets(path);
    }
}
