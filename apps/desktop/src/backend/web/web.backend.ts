import { IAppBackend } from '../app.interface';
import { IResponse, Response } from '../dto/response';
import { IPersistedState } from '../common/types';

export class WebAppBackend implements IAppBackend {
    async create(params: { name: string }): Promise<IResponse<{ id: string }>> {
        return Response.succeed();
    }
    async open(path: string | null): Promise<IResponse<{ id: string }>> {
        return Response.succeed();
    }
    async load(id: string | null): Promise<IResponse<{ id: string }>> {
        return Response.succeed();
    }
    async getState(id: string): Promise<IResponse<IPersistedState>> {
        return Response.succeed();
    }
    async persistState(id: string, state: IPersistedState): Promise<IResponse> {
        return Response.succeed();
    }
    async removeState(id: string): Promise<IResponse> {
        return Response.succeed();
    }
}
