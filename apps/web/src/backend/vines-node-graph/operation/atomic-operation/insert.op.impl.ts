import { IInsertOp } from '@/backend/vines-node-graph/operation/vines-graph-operation.interface';
import { VinesNodeGraphService } from '@/backend/vines-node-graph/vines-node-graph.service';
import { IOperation } from '../operation.interface';

/**
 * 插入原子操作
 */
export class InsertOperation implements IOperation {
    constructor(
        private uid: string,
        private op: IInsertOp,
        private vinesNodeGraphService: VinesNodeGraphService,
    ) {}

    async execute() {
        const { payload } = this.op;
        const { to, node } = payload;

        const toPrevId = to.prev;
        const toNextId = to.next;

        if (!toPrevId && !toNextId && !to.above) {
            return { id: '', type: this.op.type, success: true, data: {} };
        }

        const nodeId = node.id;

        const nodeCreateInput = {
            id: nodeId,
            x: node.x,
            y: node.y,
            type: node.type,
            above: to.above,
            content: JSON.stringify(node.content),
        };

        await this.vinesNodeGraphService.create(nodeCreateInput);

        const { id, type, ...loc } = nodeCreateInput;
        return {
            id: this.op.id,
            type: this.op.type,
            success: true,
            data: { id, type: type as any, location: loc, content: node.content },
        };
    }
}
