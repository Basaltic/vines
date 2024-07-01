import { createStoreFactory } from '@viness/store';
import { INode, INodeLocation } from '../node/node';
import { createStatePersisiStorage } from './persist/storage';

export type NodeState = INode & {
    selected: boolean;
};

export const defaultNodeState: NodeState = {
    id: '',
    type: '',
    data: void 0,
    location: {},

    selected: false,
};

// every node instance has a individual state store instance
export const nodeStoreFactory = createStoreFactory<NodeState>({
    defaultState: defaultNodeState,
    persist: (id: string) => {
        return {
            storage: createStatePersisiStorage(id),
        };
    },
}).withActions(({ set }) => ({
    changeId: (id: string) =>
        set((s) => {
            s.id = id;
        }),
    changeData: (data: any) =>
        set((s) => {
            s.data = data;
        }),
    updateLocation: (location: Partial<INodeLocation>) =>
        set((s) => {
            const sLocation = s.location;
            Object.assign(sLocation, location);
        }),
}));

export const useNodeStoreFactory = nodeStoreFactory;
