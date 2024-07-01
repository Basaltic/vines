/**
 * Manage All the state of the nodes
 * - atom operations
 * -
 */

import { createStore } from '@viness/store';
import { createStatePersisiStorage } from './persist/storage';
import { nodeStoreFactory } from './node.store';
import { generateId } from '@/common/util/id';

export interface IBoardState {
    uppest?: string;
    current?: string;
}

// TODO: set fixed id for test
const defaultBoardState: IBoardState = {
    uppest: undefined,
    current: undefined,
};

export const boardStore = createStore<IBoardState>({
    defaultState: defaultBoardState,
    persist: () => ({
        name: '',
        storage: () => createStatePersisiStorage('board'),
    }),
}).withActions(({ set }) => ({
    changeUppest: (uppest?: string) =>
        set((s) => {
            s.uppest = uppest;
        }),
    changeCurrent: (current?: string) =>
        set((s) => {
            s.current = current;
        }),
}));

export const getCurrentNodeStore = () => {
    const { current } = boardStore.state.get();

    return current ? nodeStoreFactory(current) : getUppestNodeStore();
};

export const useCurrentNodeStore = () => {
    const { current } = boardStore.state.use();

    let currentNodeId = current;
    if (!currentNodeId) {
        const { uppest } = boardStore.state.get();
        currentNodeId = uppest;
        boardStore.actions.changeCurrent(uppest);
    }

    return nodeStoreFactory(currentNodeId);
};

export const getUppestNodeStore = () => {
    const { uppest } = boardStore.state.get();

    let uppestNodeId = uppest;
    if (!uppestNodeId) {
        uppestNodeId = generateId();
        boardStore.actions.changeUppest(uppestNodeId);
    }

    const store = nodeStoreFactory(uppestNodeId);

    store.actions.changeId(uppestNodeId);

    return store;
};

export const useUppestNodeStore = () => {
    const { uppest } = boardStore.state.use();

    let uppestNodeId = uppest;
    if (!uppestNodeId) {
        uppestNodeId = generateId();
        boardStore.actions.changeUppest(uppestNodeId);
    }

    return nodeStoreFactory(uppestNodeId);
};
