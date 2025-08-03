import { Injectable } from '@vines/core';
import { IDeleteOp, OpType } from '@/backend/vines-node-graph/operation/vines-graph-operation.interface';
import { VinesNodeGraphService } from '@/backend/vines-node-graph/vines-node-graph.service';
import { IOperation, IOperationFactory } from '../operation.interface';
import { DeleteOperation } from './delete.op.impl';

@Injectable()
export class DeleteOperationFactory implements IOperationFactory {
    type = OpType.Delete;
    constructor(private vinesNodeGraphService: VinesNodeGraphService) {}

    create(uid: string, op: IDeleteOp): IOperation {
        return new DeleteOperation(uid, op, this.vinesNodeGraphService);
    }
}
