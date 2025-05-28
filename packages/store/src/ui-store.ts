import type { ID } from './types';
import { type ActionObjectType, attachStoreActions, type CreateStateActions, type PendingToDefineActionsType } from './ui-actions';
import { createState, type StateOption, type UIState } from './ui-state';
import { storeManager } from './ui-store-manager';

export type UIStore<StateValue extends object, Actions extends ActionObjectType> = {
    /**
     * state values in this store
     */
    state: UIState<StateValue>;

    /**
     * actions binded to this store
     */
    actions: CreateStateActions<StateValue, Actions>;

    /**
     * destory this store instance
     */
    destory: () => void;
};

function createStoreImpl<S extends object, Actions1 extends ActionObjectType>(
    option: StateOption<S>,
    instanceId: ID,
    pendingToDefineActionsList: PendingToDefineActionsType[],
) {
    /**
     * cache first
     */
    const makeStore = (id) => {
        const cachedStore = storeManager.get<S, Actions1>(id);

        if (cachedStore) {
            return cachedStore;
        }

        const state = createState<S>(option);

        const store: UIStore<S, CreateStateActions<S, Actions1>> = {
            state,
            actions: null as any, // will be attached later
            destory: () => {
                storeManager.remove(id);
            },
        };

        /**
         * attach actions on `store`
         */
        attachStoreActions(store, pendingToDefineActionsList);

        storeManager.register(id, store);

        return store;
    };

    const factory = (id: ID = instanceId): UIStore<S, Actions1> => {
        return makeStore(id);
    };

    /**
     * duplicates define actions are not allowed
     */
    type WithoutPreviousActions<T> = { [P in keyof T]?: never } & { [P in Exclude<any, keyof T>]?: (...args: any[]) => any };

    factory.withActions = <Actions2 extends WithoutPreviousActions<Actions1>>(nextDefineActions: (state: UIState<S>) => Actions2) => {
        pendingToDefineActionsList.push({ defineActions: nextDefineActions });

        return createStoreImpl<S, Actions2 & Actions1>(option, instanceId, pendingToDefineActionsList);
    };

    return factory;
}

/**
 * create a single store instance
 *
 * @param option
 * @returns
 */
export function createStore<S extends object>(option: StateOption<S>) {
    const instanceId = Symbol(option?.name);

    const pendingToDefineActionsList: PendingToDefineActionsType[] = [];

    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    return createStoreImpl<S, {}>(option, instanceId, pendingToDefineActionsList);
}
