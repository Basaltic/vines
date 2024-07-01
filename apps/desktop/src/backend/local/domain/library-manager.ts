import { appStore } from '../common/store';
import { CreativeLibrary } from './library';
import { isEmpty } from 'radash';

const LIBRARY_LIST_STORE_KEY = 'app-library-list-key';

/**
 * Manage All the library instances
 */
export class LibraryManager {
    private registry = new Map<string, CreativeLibrary>();

    get(path: string) {
        return this.registry.get(path);
    }

    register(library: CreativeLibrary) {
        this.registry.set(library.basePath, library);
        this.registry.set(library.info.data.id, library);
    }

    private async initialize() {
        const libraryPaths = await appStore.get<string[]>(LIBRARY_LIST_STORE_KEY);
        if (!isEmpty(libraryPaths)) {
        }
    }
}
