import { Injectable } from '@vines/core';
import { IdentifierService } from '@/backend/common/id.service';
import { IInsertOp, OpType } from '@/backend/vines-node-graph/operation/vines-graph-operation.interface';
import { VinesNodeGraphService } from '@/backend/vines-node-graph/vines-node-graph.service';
import { IOperation, IOperationFactory } from '../operation.interface';
import { InsertOperation } from './insert.op.impl';

@Injectable()
export class InsertOperationFactory implements IOperationFactory {
    type = OpType.Insert;
    constructor(
        private vinesNodeGraphService: VinesNodeGraphService,
        private idService: IdentifierService,
    ) {}

    create(uid: string, op: IInsertOp): IOperation {
        return new InsertOperation(uid, op, this.vinesNodeGraphService);
    }
}
