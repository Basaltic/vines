import type { IResponse } from './domain/dto/response';

export type ILibraryController = {};

export interface IAppSettingsController {
    /**
     * Get App Settings
     */
    get(): any;
    /**
     * Update App Settings
     */
    update(settings: any): Promise<IResponse>;
}

export interface IAppHistoryController {
    /**
     * Get all the library view history.
     */
    getLibraryViewHistory(): Promise<IResponse<string[]>>;
    addLibraryViewHistory(path: string): Promise<IResponse>;
    clearLibraryViewHistory(): Promise<IResponse>;
}

export interface IAppBackend {
    library: ILibraryController;
    settings: IAppSettingsController;
    history: IAppHistoryController;
}
