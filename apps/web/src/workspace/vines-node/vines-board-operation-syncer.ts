import { Inject, Injectable } from '@vines/core';
import { AppUseCasesInWeb } from '@/backend/usecase.impl.web';
import { AppUseCaseToken } from '@/backend/usecase.interface';
import { IOp } from '../../backend/vines-node-graph/operation/vines-graph-operation.interface';
import { EventEmitter } from '../../common/event-emitter';
import { VINES_BOARD_OPERATION_MUTATION_ADDED, VinesBoardOpHistory } from './vines-board-operation-history';

@Injectable()
export class VinesBoardOperationSyncer {
    private syncing = false;

    constructor(
        private events: EventEmitter,
        private operationHistory: VinesBoardOpHistory,
        @Inject(AppUseCaseToken) private appUseCase: AppUseCasesInWeb,
    ) {}

    start() {
        this.events.on(VINES_BOARD_OPERATION_MUTATION_ADDED, () => this.syncOperations());

        console.log(this.events, this.events.eventNames());
    }

    stop() {
        this.events.off(VINES_BOARD_OPERATION_MUTATION_ADDED);
    }

    /**
     * 同步数据
     */
    private async syncOperations() {
        if (this.syncing) {
            return;
        }

        console.log('syncing ==> ', this.operationHistory.mutationQueue);

        try {
            this.syncing = true;
            const qlen = this.operationHistory.mutationQueue.length;
            if (qlen <= 0) {
                return;
            }

            const ops: IOp[] = [];
            for (let i = 0; i < qlen; i += 1) {
                const mutation = this.operationHistory.mutationQueue.shift();
                if (mutation) {
                    for (const group of mutation) {
                        ops.push(group.redoOp);
                    }
                }
            }

            if (ops.length > 0) {
                const res = await this.appUseCase.syncOperations({ ops });
                // TODO: retry
                if (res) {
                    return true;
                }
                return false;
            }
        } catch (e) {
            // empty
        } finally {
            this.syncing = false;
            setTimeout(() => {
                this.syncOperations();
            }, 2000);
        }
    }
}
