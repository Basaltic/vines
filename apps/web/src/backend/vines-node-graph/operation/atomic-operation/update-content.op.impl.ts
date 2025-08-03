import { applyPatches } from '@vines/store';
import { IUpdateContentOp } from '@/backend/vines-node-graph/operation/vines-graph-operation.interface';
import { VinesNodeGraphService } from '@/backend/vines-node-graph/vines-node-graph.service';
import { IOperation } from '../operation.interface';

/**
 * 更新内容操作
 */
export class UpdateContentOperation implements IOperation {
    constructor(
        private uid: string,
        private op: IUpdateContentOp,
        private vinesNodeGraphService: VinesNodeGraphService,
    ) {}

    async execute() {
        const { payload } = this.op;
        const { nodeId, changes } = payload;

        const nodeToUpdate = await this.vinesNodeGraphService.getOneById(nodeId);
        const oldContentStr = nodeToUpdate?.content;
        const oldContent = JSON.parse(oldContentStr);

        const newNodeContent: any = applyPatches(oldContent || {}, changes);
        const newNodeContentStr = JSON.stringify(newNodeContent);

        const updateResult = await this.vinesNodeGraphService.updateContent(nodeId, newNodeContentStr);

        return { id: this.op.id, type: this.op.type, success: true, data: updateResult };
    }
}
