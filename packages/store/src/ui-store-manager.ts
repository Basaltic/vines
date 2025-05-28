import type { ID } from './types';
import type { ActionObjectType } from './ui-actions';
import type { UIStore } from './ui-store';

function createStoreManager() {
    const storeRegistry = new Map<ID, UIStore<any, any>>();

    return {
        get<S extends object, Actions extends ActionObjectType>(id: ID): UIStore<S, Actions> | undefined {
            const store = storeRegistry.get(id);

            return store;
        },

        register<S extends object, Actions extends ActionObjectType>(id: ID, store: UIStore<S, Actions>) {
            storeRegistry.set(id, store);
        },

        remove(id: ID) {
            storeRegistry.delete(id);
        },
    };
}

export const storeManager = createStoreManager();
