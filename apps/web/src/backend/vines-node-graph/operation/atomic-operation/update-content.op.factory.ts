import { Injectable } from '@vines/core';
import { IUpdateContentOp, OpType } from '@/backend/vines-node-graph/operation/vines-graph-operation.interface';
import { VinesNodeGraphService } from '@/backend/vines-node-graph/vines-node-graph.service';
import { IOperation, IOperationFactory } from '../operation.interface';
import { UpdateContentOperation } from './update-content.op.impl';

@Injectable()
export class UpdateOperationFactory implements IOperationFactory {
    type = OpType.UpdateContent;
    constructor(private vinesNodeGraphService: VinesNodeGraphService) {}

    create(uid: string, op: IUpdateContentOp): IOperation {
        return new UpdateContentOperation(uid, op, this.vinesNodeGraphService);
    }
}
