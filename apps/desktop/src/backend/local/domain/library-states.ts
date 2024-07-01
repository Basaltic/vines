import { exists } from '@tauri-apps/plugin-fs';
import { JSONDB } from '../common/database';
import { IPersistedState } from '../../common/types';

export interface ILibraryStates {
    states: Record<string, IPersistedState>;
}

export const DEFAULT_STATES_DATA = {
    states: {},
};

export const LIBRARY_NODES_STORE_FILE = 'states.json';

export class LibraryStates {
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

        return new LibraryStates(db);
    }

    async get(id: string) {
        await this.db.read();
        return this.db.data.states[id];
    }

    async set(id: string, node: IPersistedState) {
        return this.db.update((data) => {
            data.states[id] = node;
        });
    }

    async remove(id: string) {
        return this.db.update((data) => {
            delete data.states[id];
        });
    }
}
