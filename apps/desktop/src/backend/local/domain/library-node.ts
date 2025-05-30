import { exists } from '@tauri-apps/plugin-fs';
import { JSONDB } from '../common/database';
import type { IPersistedState } from '../../common/types';

export interface ILibraryStates {
    nodes: Record<string, IPersistedState>;
}

export const DEFAULT_STATES_DATA = {
    nodes: {},
};

export const LIBRARY_NODES_STORE_FILE = 'nodes.json';

export class LibraryNodes {
    private db: JSONDB<ILibraryStates>;

    constructor(db: JSONDB<ILibraryStates>) {
        this.db = db;
    }

    static initialize(basePath: string) {
        const path = `${basePath}/${LIBRARY_NODES_STORE_FILE}`;

        const db = new JSONDB<ILibraryStates>(path, DEFAULT_STATES_DATA);

        const existed = exists(path);
        if (!existed) {
            db.write();
        }

        return new LibraryNodes(db);
    }

    async get(id: string) {
        await this.db.read();
        return this.db.data.nodes[id];
    }

    async set(id: string, node: IPersistedState) {
        return this.db.update((data) => {
            data.nodes[id] = node;
        });
    }

    async remove(id: string) {
        return this.db.update((data) => {
            delete data.nodes[id];
        });
    }
}
