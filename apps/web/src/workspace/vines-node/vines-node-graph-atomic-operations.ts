import { Injectable } from '@viness/core';
import { produceWithPatches } from '@viness/store';
import { OpFactory } from '../../backend/vines-node-graph/operation/vines-graph-operation.factory';
import { VinesBoardOpHistory } from './vines-board-operation-history';
import { VinesNode } from './vines-node';
import type { IVinesNode } from './vines-node.interface';
import type { IVinesNodeContent } from './vines-node-content';
import { VinesNodeGraph } from './vines-node-graph';
import { OpLocation } from '../../backend/vines-node-graph/operation/vines-graph-operation.interface';
import { cloneDeep } from 'lodash-es';

/**
 * 节点图的原子操作，这些操作会被记录到历史栈中
 */
@Injectable()
export class VinesNodeGraphAtomicOperations {
    constructor(
        private history: VinesBoardOpHistory,
        private vinesNodeGraph: VinesNodeGraph,
    ) {}

    insert(payload: { node: IVinesNode; to: OpLocation }) {
        const { node, to } = payload;

        const noId = !node.id;
        if (noId) return;

     

        if (to.prev) {
            const prevNode = this.vinesNodeGraph.getNode(to.prev);
            node.above = prevNode?.above;

            const aboveNode = this.vinesNodeGraph.getNode(node.above);
            if (!aboveNode) return;

            aboveNode?.appendChildAfter(to.prev, node.id);
        } else if (to.next) {
            const nextNode = this.vinesNodeGraph.getNode(to.next);
            node.above = nextNode?.above;

            const aboveNode = this.vinesNodeGraph.getNode(node.above);
            if (!aboveNode) return;

            aboveNode?.appendChildBefore(to.next, node.id);
        } else {
            node.above = to.above

            const aboveNode = this.vinesNodeGraph.getNode(node.above);
            if (!aboveNode) return;

            aboveNode.appendChild(node.id);
        }

        if (to.x) {
            node.x = to.x;
        }
        if (to.y) {
            node.y = to.y;
        }

        const vinesNode = VinesNode.create(node);
        this.vinesNodeGraph.setNode(vinesNode);

        const redoOp = OpFactory.createInsertOp(node, to);
        const undoOp = OpFactory.createDeleteOp(node.id);
        this.history.push({ redoOp, undoOp });
    }

    delete(payload: { nodeId: string }) {
        const { nodeId } = payload;

        const node = this.vinesNodeGraph.getNode(nodeId);
        if (!node) return;

        this.vinesNodeGraph.deleteNode(nodeId);

        const nodeStateValue = cloneDeep(node.state$.get());

        const redoOp = OpFactory.createDeleteOp(nodeId);
        const undoOp = OpFactory.createInsertOp(nodeStateValue, { above: node.above });
        this.history.push({ redoOp, undoOp });
    }

    move(payload: { movingNodeId: string; to: { x?: number; y?: number; above?: string } }) {
        const { movingNodeId, to } = payload;

        if (!movingNodeId) return;

        const noLocatoin = !to.above && to.x === undefined && to.y === undefined;
        if (noLocatoin) return;

        const movingNode = this.vinesNodeGraph.getNode(movingNodeId);

        if (!movingNode) return;

        const movingNodeOldLocation = {
            x: movingNode.x,
            y: movingNode.y,
            above: movingNode.above,
            order: movingNode.order,
        };

        if (to.above) {
            const neoAboveNode = this.vinesNodeGraph.getNode(to.above);
            neoAboveNode?.appendChild(movingNodeId);

            const oldAboveNode = this.vinesNodeGraph.getNode(movingNode?.above);
            oldAboveNode?.removeChild(movingNodeId);

            movingNode?.changeState({ above: to.above, x: to.x, y: to.y });
        } else {
            movingNode?.changeState({ x: to.x, y: to.y });
        }

        const redoOp = OpFactory.createMoveOp(movingNodeId, to);
        const undoOp = OpFactory.createMoveOp(movingNodeId, movingNodeOldLocation);

        this.history.push({ redoOp, undoOp });
    }

    update<T extends IVinesNodeContent>(payload: { nodeId: string | null; content: Partial<T> | any }) {
        const { nodeId, content } = payload;

        if (!nodeId) return;

        const nodeToUpdate = this.vinesNodeGraph.getNode(nodeId);
        if (!nodeToUpdate) return;

        const [, patches, inversePatches] = produceWithPatches(nodeToUpdate.content, (draft) => {
            return Object.assign(draft, content);
        });

        this.vinesNodeGraph.updateNodeContent(nodeId, patches);

        const redoOp = OpFactory.createUpdateContentOp(nodeId, patches);
        const undoOp = OpFactory.createUpdateContentOp(nodeId, inversePatches);
        this.history.push({ redoOp, undoOp });
    }
}
