import { token } from '@viness/core';
import { NodeDescriptionRegistry } from './node/node-registry';
import { Commands } from './operation/command';
import { AtomicOperationHistory } from './operation/operation-history';
import { AtomicOperations } from './operation/operations';
import { headingNodeDescription } from './node/node-impl/heading';

export const BOARD_BOARD_EDITOR_TOKEN = token<CardBoardEditor>('board');

export class CardBoardEditor {
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

export const cardBoardEditor = new CardBoardEditor();

cardBoardEditor.descriptionRegistry.register(headingNodeDescription);
