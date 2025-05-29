/**
 * Manage All the state of the nodes
 * - atom operations
 * -
 */

import { createStore } from '@viness/store';
import { createStatePersisiStorage } from './node/node-persist/storage';
import { nodeStoreFactory } from './node/node.store';
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
}))();

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

export const getCurrentNodeStore = () => {
    const { current } = boardStore.state.get();

    return current ? nodeStoreFactory(current) : getUppestNodeStore();
};

export const useCurrentNode = () => {
    const { current } = boardStore.state.use();

    let currentNodeId = current;
    if (!currentNodeId) {
        const { uppest } = boardStore.state.get();
        currentNodeId = uppest;
        boardStore.actions.changeCurrent(uppest);
    }

    return nodeStoreFactory(currentNodeId);
};
