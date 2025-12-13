import { Injectable } from '@vines/core';
import { IdentifierService } from '@/backend/common/id.service';
import { IMoveOp, VinesGraphOperationType } from '@/backend/vines-node-graph/operation/vines-graph-operation.interface';
import { VinesNodeGraphService } from '@/backend/vines-node-graph/vines-node-graph.service';
import { IOperation, IOperationFactory } from '../operation.interface';
import { MoveOperation } from './move.op.impl';

@Injectable()
export class MoveOperationFactory implements IOperationFactory {
    type = VinesGraphOperationType.Move;
    constructor(
        private vinesNodeGraphService: VinesNodeGraphService,
        private idService: IdentifierService,
    ) {}

    create(uid: string, op: IMoveOp): IOperation {
        return new MoveOperation(uid, op, this.vinesNodeGraphService, this.idService);
    }
}
