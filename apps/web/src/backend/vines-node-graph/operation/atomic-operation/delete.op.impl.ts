import { VinesNodeGraphService } from '@/backend/vines-node-graph/vines-node-graph.service';
import { IDeleteOp } from '@/backend/vines-node-graph/operation/vines-graph-operation.interface';
import { IOperation } from '../operation.interface';

/**
 * 删除原子操作
 */
export class DeleteOperation implements IOperation {
    constructor(
        private uid: string,
        private op: IDeleteOp,
        private nodeService: VinesNodeGraphService,
    ) {}

    async execute() {
        const { nodeId } = this.op.payload;

        // 直接删除即可
        await this.nodeService.deleteOne(nodeId);

        return { id: this.op.id, type: this.op.type, success: true, data: true };
    }
}
