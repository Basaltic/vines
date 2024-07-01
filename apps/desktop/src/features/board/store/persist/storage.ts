import { controllers } from '@/backend';
import { PersistStorage } from '@viness/store';
import { INode } from '../../node/node';

export function createStatePersisiStorage(id: string) {
    const persistentStorage: PersistStorage<INode> = {
        getItem: async () => {
            const res = await controllers.app.getState(id);
            if (res.success) {
                return res.data || { state: {} as any, version: 1 };
            } else {
                return { state: {} as any, version: 1 };
            }
        },
        setItem: (_, value) => {
            controllers.app.persistState(id, { state: value, version: 1 });
        },
        removeItem: () => {
            controllers.app.removeState(id);
        },
    };

    return persistentStorage;
}
