import { NodeDescriptionRegistry } from './node/node-registry';
import { Commands } from './operation/command';
import { AtomicOperationHistory } from './operation/operation-history';
import { AtomicOperations } from './operation/operations';

export class Board {
    private history: AtomicOperationHistory;
    private operations: AtomicOperations;

    descriptionRegistry: NodeDescriptionRegistry;
    commands: Commands;

    constructor() {
        this.descriptionRegistry = new NodeDescriptionRegistry();
        this.history = new AtomicOperationHistory();
        this.operations = new AtomicOperations(this.history);

        this.commands = new Commands(this.history, this.operations);
    }
}
