import { ID } from './types.ts';
import { ActionObjectType } from './ui-actions.ts';
import { UIStore } from './ui-store.ts';

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
