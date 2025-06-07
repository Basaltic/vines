import type { LibraryInfo } from './library-setting';
import { AppAssets } from './app-assets';
import { AppNodes } from './app-nodes';
import { LocalStore } from '../common/persist-store';
import type { IAppSettings } from '@/backend/domain/app';
import { APP_SETTING_STORE_NAME } from '../common/constants';

export class VinessApplication {
    public basePath = '';

    public nodes: AppNodes;
    public assets: AppAssets;
    public settings: LocalStore<IAppSettings>;

    constructor(params: { basePath: string; nodes: AppNodes; assets: AppAssets; settings: LocalStore<IAppSettings> }) {
        const { basePath, nodes, assets, settings } = params;
        this.settings = settings;
        this.nodes = nodes;
        this.assets = assets;
        this.basePath = basePath;
    }

    /**
     * Set up the library with the given base path
     * @param basePath
     * @returns
     */
    static async create(basePath: string) {
        const nodes = await AppNodes.create(basePath);
        const assets = await AppAssets.create(basePath);
        const settings = await LocalStore.create<IAppSettings>(APP_SETTING_STORE_NAME);

        return new VinessApplication({ basePath, nodes, assets, settings });
    }

    /**
     * Check if the folder is a valid library
     *
     * @param path
     */
    static async validate(path: string) {
        return true;
    }
}
