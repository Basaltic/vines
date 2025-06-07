import type { IAppHistoryController } from '../app.interface';
import type { IResponse } from '../domain/dto/response';

export class AppHistoryController implements IAppHistoryController {
    getLibraryViewHistory(): Promise<IResponse<string[]>> {
        throw new Error('Method not implemented.');
    }
    addLibraryViewHistory(path: string): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }
    clearLibraryViewHistory(): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }
}
