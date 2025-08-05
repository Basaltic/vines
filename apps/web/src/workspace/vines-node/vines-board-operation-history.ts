import { Injectable } from '@vines/core';
import type { IMutation, IOpGroup } from '../../backend/vines-node-graph/operation/vines-graph-operation.interface';
import { EventEmitter } from '../../common/event-emitter';

export const VINES_BOARD_OPERATION_MUTATION_ADDED = 'vines-board-mutation-added';

export interface IOpHistory {
    mutationQueue: IMutation[];
    push(opGroup: IOpGroup): void;
    startChange(): void;
    endChange(): void;
    undo(callback: (mutation: IMutation) => void): void;
    redo(callback: (mutation: IMutation) => void): void;
    transact(cb: () => void): void;
}

/**
 * 节点画布树的操作历史
 */
@Injectable()
export class VinesBoardOpHistory implements IOpHistory {
    private undoStack: IMutation[] = [];
    private redoStack: IMutation[] = [];
    private mutation: IMutation = [];
    private isChanging = false;

    public mutationQueue: IMutation[] = [];

    constructor(private events: EventEmitter) {}

    /**
     * 记录
     */
    public push(ops: IOpGroup) {
        if (this.isChanging) {
            this.mutation.push(ops);
        }
    }

    /**
     * 开始记录变更
     */
    public startChange() {
        this.isChanging = true;
        this.mutation = [];
    }

    /**
     * 结束记录变更
     */
    public endChange() {
        this.isChanging = false;

        const mutation = this.mutation;

        if (mutation.length > 0) {
            this.undoStack.push(mutation);
            this.mutationQueue.push(mutation);

            this.redoStack = [];
            this.mutation = [];
        }

        this.events.emit(VINES_BOARD_OPERATION_MUTATION_ADDED);
    }

    /**
     * 撤销
     */
    public undo(callback: (mutation: IMutation) => void) {
        const mutation = this.undoStack.pop();
        if (mutation) {
            callback(mutation);

            this.redoStack.push(mutation);
        }
    }

    /**
     * 重放
     */
    public redo(callback: (mutation: IMutation) => void) {
        const mutation = this.redoStack.pop();
        if (mutation) {
            callback(mutation);

            this.undoStack.push(mutation);
        }
    }

    /**
     * 事务
     */
    public transact(cb: () => void) {
        this.startChange();
        try {
            cb && cb();
        } catch (e) {
            // empty
        } finally {
            this.endChange();
        }
    }
}
