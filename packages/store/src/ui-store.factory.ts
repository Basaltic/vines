import { isFunction } from 'radash';
import { StateOption, createState, UIState, createLazyState } from './ui-state';
import { storeManager } from './ui-store-manager';
import { UIStore } from './ui-store';
import { ID } from './types';

/**
 * create a store factory to produce same structed store instances
 *
 * @param option
 * @returns
 */
export function createStoreFactory<S extends object>(option: StateOption<S>) {
    const defaultInstanceId = Symbol(option?.name);

    return {
        withActions: function <T extends Record<string, Function>>(rawActions: (state: UIState<S>) => T) {
            return (id: ID = defaultInstanceId) => {
                const cachedStore = storeManager.get(id);
                if (cachedStore) return cachedStore as unknown as UIStore<S, T>;

                option.persist = isFunction(option.persist) ? option.persist(id) : option.persist;

                const state = option.lazy ? createLazyState(option) : createState<S>(option);
                const actions = rawActions(state);
                const store: UIStore<S, T> = {
                    state,
                    actions,
                    destory: () => storeManager.remove(id),
                };

                storeManager.register(id, store);

                return store;
            };
        },
    };
}

/**
 * create a single store instance
 *
 * @param option
 * @returns
 */
export function createStore<S extends object>(option: StateOption<S>) {
    return {
        withActions: function <T extends Record<string, Function>>(rawActions: (state: UIState<S>) => T) {
            return createStoreFactory<S>(option).withActions<T>(rawActions)();
        },
    };
}
