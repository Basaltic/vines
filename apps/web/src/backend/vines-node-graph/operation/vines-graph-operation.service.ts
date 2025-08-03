import { Injectable } from '@viness/core';
import { IOp } from '@/backend/vines-node-graph/operation/vines-graph-operation.interface';
import { DeleteOperationFactory } from './atomic-operation/delete.op.factory';
import { InsertOperationFactory } from './atomic-operation/insert.op.factory';
import { MoveOperationFactory } from './atomic-operation/move.op.factory';
import { UpdateOperationFactory } from './atomic-operation/update-content.op.factory';
import { IOperation, IOperationFactory } from './operation.interface';

@Injectable()
export class VinesGraphOperationService {
    private opFactoryMap: Map<string, IOperationFactory> = new Map();

    constructor(
        moveOpFactory: MoveOperationFactory,
        insertOpFactory: InsertOperationFactory,
        deleteOpFactory: DeleteOperationFactory,
        updateOpFactory: UpdateOperationFactory,
    ) {
        this.opFactoryMap.set(moveOpFactory.type, moveOpFactory);
        this.opFactoryMap.set(insertOpFactory.type, insertOpFactory);
        this.opFactoryMap.set(deleteOpFactory.type, deleteOpFactory);
        this.opFactoryMap.set(updateOpFactory.type, updateOpFactory);
    }

    async execute(uid: string, op: IOp) {
        const operation = this.createOperation(uid, op);
        return operation?.execute();
    }

    private createOperation(uid: string, op: IOp): IOperation | undefined {
        const operationFactory = this.opFactoryMap.get(op.type);

        const operation = operationFactory?.create(uid, op);

        return operation;
    }
}
