import { mkdir } from '@tauri-apps/plugin-fs';
import { open } from '@tauri-apps/plugin-dialog';
import { CreativeLibrary } from './domain/app';
import { LibraryManager } from './domain/library-instance-manager';
import { LibraryOpenHistory } from './domain/app-history';
import { type IResponse, Response } from '../domain/dto/response';
import type { ILibraryController } from '../app.interface';
import type { IPersistedState } from '../common/types';

/**
 *
 */
export class LibraryController implements ILibraryController {
    private libraryManager = new LibraryManager();
    private libraryOpenHistory = new LibraryOpenHistory();

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

        this.libraryOpenHistory.add(path);

        return Response.succeed({ id: library.info.data.id });
    }

    /**
     * Open a folder
     */
    async open(passedPath: string | null = null) {
        let path = passedPath;
        if (!path) {
            // select library folder
            path = await open({ directory: true, multiple: false, canCreateDirectories: true, title: 'select a library folder' });

            if (!path) return Response.fail<any>();
        }

        let library = this.libraryManager.get(path);
        const existed = !!library;

        // validate
        if (!existed) {
            library = await CreativeLibrary.initialize(path);
            this.libraryManager.register(library);
        }

        this.libraryOpenHistory.add(path);

        return Response.succeed({ id: library.info.data.id });
    }

    list(): Promise<IResponse<any[]>> {
        throw new Error('Method not implemented.');
    }
}
