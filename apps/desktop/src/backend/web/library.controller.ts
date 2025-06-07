import type { ILibraryController } from '../app.interface';
import type { IPersistedState } from '../common/types';
import type { IResponse } from '../domain/dto/response';

export class LibraryController implements ILibraryController {
    open(idOrPath: string | null): Promise<IResponse<{ id: string }>> {
        throw new Error('Method not implemented.');
    }
    openLast(): Promise<IResponse<{ id: string }>> {
        throw new Error('Method not implemented.');
    }
    create(params: { name: string }): Promise<IResponse<{ id: string }>> {
        throw new Error('Method not implemented.');
    }
    list(): Promise<IResponse<any[]>> {
        throw new Error('Method not implemented.');
    }
    getState(id: string): Promise<IResponse<IPersistedState>> {
        throw new Error('Method not implemented.');
    }
    persistState(id: string, state: IPersistedState): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }
    removeState(id: string): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }
}
