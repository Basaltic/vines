import { first } from 'radash';
import { appOtherPersistInfoStore } from '../common/database';
import type { ILibraryViewHistory } from '@/backend/domain/library';

const OPEN_HISTORY = 'app-library-open-history';

export class LibraryOpenHistory {
    // TODO: add limit
    private openHistory: ILibraryViewHistory[] = [];

    async add(path: string) {
        this.openHistory.unshift({ id: '', path });
        this.openHistory = this.openHistory.slice(0, 10);

        await appOtherPersistInfoStore.set(OPEN_HISTORY, this.openHistory);
        await appOtherPersistInfoStore.save();
    }

    async get() {
        const openHistory = (await appOtherPersistInfoStore.get<ILibraryViewHistory[]>(OPEN_HISTORY)) || [];
        this.openHistory = openHistory;
        return openHistory;
    }

    async getFirst() {
        const openHistory = (await appOtherPersistInfoStore.get<ILibraryViewHistory[]>(OPEN_HISTORY)) || [];
        this.openHistory = openHistory;
        return first(openHistory);
    }
}
