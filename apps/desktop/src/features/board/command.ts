import { generateId } from '@/common/util/id';
import type { AtomicOperationHistory } from './operation/operation-history';
import type { AtomicOperations } from './operation/operations';

/**
 * Commands for the editor to execute to change the state of the board.
 */
export class Commands {
    constructor(
        private history: AtomicOperationHistory,
        private operations: AtomicOperations,
    ) {}

    undo() {
        this.history.transact(() => {
            this.history.undo(() => {});
        });
    }

    redo() {
        this.history.transact(() => {
            this.history.redo(() => {});
        });
    }

    insertNode(type: string, data: any) {
        this.history.transact(() => {
            this.operations.insert({ id: generateId(), type, data, location: { x: 0, y: 0 } });
        });
    }

    removeNode() {}

    movePosition() {}
}
