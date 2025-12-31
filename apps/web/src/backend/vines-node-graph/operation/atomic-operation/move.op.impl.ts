import { pickBy } from 'lodash-es';
import { IMoveOp } from '@/backend/vines-node-graph/operation/vines-graph-operation.interface';
import { VinesNodeGraphService } from '@/backend/vines-node-graph/vines-node-graph.service';
import { IOperation } from '../operation.interface';

/**
 * 移动操作
 */
export class MoveOperation implements IOperation {
    constructor(
        private uid: string,
        private op: IMoveOp,
        private vinesNodeGraphService: VinesNodeGraphService,
    ) {}

    async execute() {
        const { payload } = this.op;
        const { nodeId, to } = payload;

        const movingNode = await this.vinesNodeGraphService.getOneById(nodeId);
        const movinngNodeId = movingNode?.id as string;

        const toParentId = to.above as string;

        const updateNode: any = pickBy({ x: to.x, y: to.y, above: toParentId });

        await this.vinesNodeGraphService.update(movinngNodeId, updateNode);

        return { id: this.op.id, type: this.op.type, success: true, data: true };
    }
}
