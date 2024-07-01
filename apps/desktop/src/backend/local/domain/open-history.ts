import { first } from 'radash';
import { appStore } from '../common/store';

const OPEN_HISTORY = 'app-library-open-history';

export class OpenHistory {
    private openHistory: string[] = [];

    async set(path: string) {
        this.openHistory.unshift(path);
        this.openHistory = this.openHistory.slice(0, 10);

        await appStore.set(OPEN_HISTORY, this.openHistory);
        await appStore.save();
    }

    async get() {
        const openHistory = (await appStore.get<string[]>(OPEN_HISTORY)) || [];
        this.openHistory = openHistory;
        return openHistory;
    }

    async getFirst() {
        const openHistory = (await appStore.get<string[]>(OPEN_HISTORY)) || [];
        this.openHistory = openHistory;
        return first(openHistory);
    }
}
