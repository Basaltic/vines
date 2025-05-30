import { LibraryInfo } from './library-setting';
import { LibraryAssets } from './library-assets';
import { LibraryNodes } from './library-node';

/**
 *
 */
export type CreativeLibraryInfo = {
    id: string;
    name: string;
};

export type LibraryNodeEntity = {
    id: string;
};

export class CreativeLibrary {
    public basePath = '';

    public info: LibraryInfo;
    public nodes: LibraryNodes;
    public assets: LibraryAssets;

    constructor(params: { basePath: string; nodes: LibraryNodes; assets: LibraryAssets; info: LibraryInfo }) {
        const { basePath, nodes, assets, info } = params;
        this.info = info;
        this.nodes = nodes;
        this.assets = assets;
        this.basePath = basePath;
    }

    /**
     * Set up the library with the given base path
     * @param basePath
     * @returns
     */
    static async initialize(basePath: string) {
        const info = await LibraryInfo.initialize(basePath);
        const nodes = await LibraryNodes.initialize(basePath);
        const assets = await LibraryAssets.initialize(basePath);

        return new CreativeLibrary({ basePath, nodes, assets, info });
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
