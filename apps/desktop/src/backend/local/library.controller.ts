import { mkdir } from '@tauri-apps/plugin-fs';
import { open } from '@tauri-apps/plugin-dialog';
import { CreativeLibrary } from './domain/library';
import { LibraryManager } from './domain/library-manager';
import { OpenHistory } from './domain/app-history';
import { type IResponse, Response } from '../dto/response';
import type { ILibraryController } from '../app.interface';
import type { IPersistedState } from '../common/types';

/**
 *
 */
export class LibraryController implements ILibraryController {
    openLast(): Promise<IResponse<{ id: string }>> {
        throw new Error('Method not implemented.');
    }

    list(): Promise<IResponse<any[]>> {
        throw new Error('Method not implemented.');
    }
    private openHistory = new OpenHistory();

    private libraryManager = new LibraryManager();

    private currentLibrary?: CreativeLibrary;

    /**
     * create a new creative library in a specific path
     * - create the lib folder & files: meta, state & inner folders: assets
     * - store the new lib id into the history
     */
    async create(params: { name: string }) {
        let basePath: string;
        try {
            basePath = await open({ directory: true, multiple: false, canCreateDirectories: true, title: 'select a folder' });
        } catch (e) {}

        if (!basePath) return Response.fail<any>();

        const { name } = params;
        const path = `${basePath}/${name}`;

        try {
            await mkdir(path);
        } catch (e) {
            console.log(e);
            return Response.fail<any>('directory is created', 400);
        }

        const library = await CreativeLibrary.initialize(path);
        this.libraryManager.register(library);

        this.openHistory.set(path);

        this.currentLibrary = library;

        return Response.succeed({ id: library.info.data.id });
    }

    /**
     * Open a folder
     */
    async open(idOrPath: string | null = null) {
        let path = '';
        if (!idOrPath) {
            // select library folder
            path = await open({ directory: true, multiple: false, canCreateDirectories: true, title: 'select a library folder' });

            if (!path) return Response.fail<any>();
        }

        let library = this.libraryManager.get(path);

        // validate
        if (!library) {
            library = await CreativeLibrary.initialize(path);
            this.libraryManager.register(library);
        }

        this.openHistory.set(path);

        this.currentLibrary = library;

        return Response.succeed({ id: library.info.data.id });
    }

    /**
     * load library
     *
     * @param id
     */
    async load(id: string) {
        const library = this.libraryManager.get(id);

        if (library?.basePath) {
            this.openHistory.set(library?.basePath);
        }

        this.currentLibrary = library;

        return Response.succeed({ id: library?.info.data.id || '' });
    }

    async getState(id: string) {
        try {
            await this.currentLibrary?.states.get(id);
            return Response.succeed<IPersistedState>();
        } catch (e) {}

        return Response.fail<IPersistedState>();
    }

    async persistState(id: string, state: IPersistedState) {
        try {
            await this.currentLibrary?.states.set(id, state);
            return Response.succeed();
        } catch (e) {}

        return Response.fail();
    }

    async removeState(id: string) {
        try {
            await this.currentLibrary?.states.remove(id);
            return Response.succeed<IPersistedState>();
        } catch (e) {}
        return Response.fail<IPersistedState>();
    }
}
