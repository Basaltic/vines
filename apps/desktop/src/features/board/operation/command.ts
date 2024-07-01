import { generateId } from '@/common/util/id';
import { AtomicOperationHistory } from './operation-history';
import { AtomicOperations } from './operations';

export class Commands {
    constructor(
        private history: AtomicOperationHistory,
        private operations: AtomicOperations,
    ) {}

    undo() {
        return this.history.undo(() => {});
    }

    redo() {
        return this.history.redo(() => {});
    }

    insertNode(type: string, data: any) {
        this.history.transact(() => {
            this.operations.insert({ id: generateId(), type, data, location: { x: 0, y: 0 } });
        });
    }

    removeNode() {}

    movePosition() {}
}
