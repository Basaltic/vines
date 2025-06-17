import type { IOperationMutation, IOperation } from './operation.interface';

/**
 * Editor Operation History
 * 操作历史
 */
export class AtomicOperationHistory {
    private undoStack: IOperationMutation[] = [];
    private redoStack: IOperationMutation[] = [];
    private mutation: IOperationMutation = [];
    private isChanging = false;

    public mutationQueue: IOperationMutation[] = [];

    /**
     * record operation history
     */
    public push(op: IOperation, inverseOp: IOperation) {
        if (this.isChanging) {
            this.mutation.push([op, inverseOp]);
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
    }

    /**
     * 撤销
     */
    public undo(callback: (mutation: IOperationMutation) => void) {
        const mutation = this.undoStack.pop();
        if (mutation) {
            callback(mutation);

            this.redoStack.push(mutation);

            console.log('undo ===> ', mutation);
        }
    }

    /**
     * 重放
     */
    public redo(callback: (mutation: IOperationMutation) => void) {
        const mutation = this.redoStack.pop();
        if (mutation) {
            callback(mutation);

            this.undoStack.push(mutation);

            console.log('redo ===> ', mutation);
        }
    }

    /**
     * 事务
     */
    public transact(cb: () => void) {
        this.startChange();
        try {
            cb?.();
        } catch (e) {
            // empty
        } finally {
            this.endChange();
        }
    }
}

export const atomicOperationHistory = new AtomicOperationHistory();
