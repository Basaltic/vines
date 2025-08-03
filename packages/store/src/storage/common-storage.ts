import { createJSONStorage, type StateStorage } from 'zustand/middleware';

const readUrlSearch = () => window.location.search.slice(1);

/**
 * 状态在URL中存储
 */
export function createUrlSearchParamsStorage<Store = any>() {
    const persistentStorage: StateStorage = {
        getItem: (key) => {
            const searchParams = new URLSearchParams(readUrlSearch());
            return searchParams.get(key);
        },
        setItem: (key, value) => {
            const searchParams = new URLSearchParams(readUrlSearch());

            searchParams.set(key, value);
            window.history.replaceState(null, '', `?${searchParams.toString()}`);
        },
        removeItem: (key) => {
            const searchParams = new URLSearchParams(readUrlSearch());

            searchParams.delete(key);
            window.history.replaceState(null, '', `?${searchParams.toString()}`);
        },
    };

    return createJSONStorage<Store>(() => persistentStorage);
}

/**
 * 状态本地持久化存储(localstorage)
 *
 * @param key
 * @returns
 */
export function createLocalPersistStorage<Store = any>() {
    const persistentStorage: StateStorage = {
        getItem: (key) => {
            const stateStr = localStorage.getItem(key);
            return stateStr;
        },
        setItem: (key, value) => {
            try {
                localStorage.setItem(key, value);
            } catch (e) {}
        },
        removeItem: (key) => {
            localStorage.removeItem(key);
        },
    };

    return createJSONStorage<Store>(() => persistentStorage);
}
