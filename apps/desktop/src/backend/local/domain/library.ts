import { LibraryInfo } from './library-setting';
import { LibraryAssets } from './library-assets';
import { LibraryStates } from './library-states';

/**
 *
 */
export type CreativeLibraryInfo = {
    id: string;
    name: string;
};

export type CreativeLibrarySettings = {};

export type CreativeLibraryState = {};

export type LibraryNodeEntity = {
    id: string;
};

export class CreativeLibrary {
    public basePath = '';

    public info: LibraryInfo;
    public states: LibraryStates;
    public assets: LibraryAssets;

    constructor(params: { basePath: string; states: LibraryStates; assets: LibraryAssets; info: LibraryInfo }) {
        const { basePath, states, assets, info } = params;
        this.info = info;
        this.states = states;
        this.assets = assets;
        this.basePath = basePath;
    }

    static async initialize(basePath: string) {
        const info = await LibraryInfo.initialize(basePath);
        const states = await LibraryStates.initialize(basePath);
        const assets = await LibraryAssets.initialize(basePath);

        return new CreativeLibrary({ basePath, states, assets, info });
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
