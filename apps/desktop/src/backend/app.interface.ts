import { IPersistedState } from './common/types';
import { IResponse } from './dto/response';

export interface IAppBackend {
    create(params: { name: string }): Promise<IResponse<{ id: string }>>;
    open(path: string | null): Promise<IResponse<{ id: string }>>;
    load(id: string | null): Promise<IResponse<{ id: string }>>;
    getState(id: string): Promise<IResponse<IPersistedState>>;
    persistState(id: string, state: IPersistedState): Promise<IResponse>;
    removeState(id: string): Promise<IResponse>;
}
