import type { IPersistedState } from './common/types';
import type { IResponse } from './dto/response';

export interface ILibraryController {
    /**
     * Open an existed library
     */
    open(path: string | null): Promise<IResponse<{ id: string }>>;
    /**
     * Open the last opened library.
     */
    openLast(): Promise<IResponse<{ id: string }>>;
    /**
     * Create a new library
     */
    create(params: { name: string }): Promise<IResponse<{ id: string }>>;

    /**
     * Get a list of libraries
     */
    list(): Promise<IResponse<any[]>>;

    getState(id: string): Promise<IResponse<IPersistedState>>;
    persistState(id: string, state: IPersistedState): Promise<IResponse>;
    removeState(id: string): Promise<IResponse>;
}

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
