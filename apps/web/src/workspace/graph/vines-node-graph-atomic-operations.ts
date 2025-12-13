import { Injectable } from '@vines/core';
import { produceWithPatches } from '@vines/store';
import { cloneDeep } from 'lodash-es';
import { VinesGraphOperationFactory } from '../../backend/vines-node-graph/operation/vines-graph-operation.factory';
import { OpLocation } from '../../backend/vines-node-graph/operation/vines-graph-operation.interface';
import { VinesBoardOpHistory } from './vines-board-operation-history';
import { VinesNode } from './vines-node';
import type { IVinesNode } from './vines-node.interface';
import type { IVinesNodeContent } from './vines-node-content.types';
import { VinesNodeGraph } from './vines-node-graph';

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
            node.above = to.above;

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

        const redoOp = VinesGraphOperationFactory.createInsertOp(node, to);
        const undoOp = VinesGraphOperationFactory.createDeleteOp(node.id);
        this.history.push({ redoOp, undoOp });
    }

    delete(payload: { nodeId: string }) {
        const { nodeId } = payload;

        const node = this.vinesNodeGraph.getNode(nodeId);
        if (!node) return;

        this.vinesNodeGraph.deleteNode(nodeId);

        const nodeStateValue = cloneDeep(node.state$.get());

        const redoOp = VinesGraphOperationFactory.createDeleteOp(nodeId);
        const undoOp = VinesGraphOperationFactory.createInsertOp(nodeStateValue, { above: node.above });
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

        const redoOp = VinesGraphOperationFactory.createMoveOp(movingNodeId, to);
        const undoOp = VinesGraphOperationFactory.createMoveOp(movingNodeId, movingNodeOldLocation);

        this.history.push({ redoOp, undoOp });
    }

    update<T extends IVinesNodeContent>(payload: { nodeId: string | null; content: Partial<T> | any }) {
        const { nodeId, content } = payload;

        console.log('update node content', { nodeId, content });

        if (!nodeId) return;

        const nodeToUpdate = this.vinesNodeGraph.getNode(nodeId);
        if (!nodeToUpdate) return;

        const [, patches, inversePatches] = produceWithPatches(nodeToUpdate.content, (draft) => {
            return Object.assign(draft, content);
        });

        this.vinesNodeGraph.updateNodeContent(nodeId, patches);

        const redoOp = VinesGraphOperationFactory.createUpdateContentOp(nodeId, patches);
        const undoOp = VinesGraphOperationFactory.createUpdateContentOp(nodeId, inversePatches);
        this.history.push({ redoOp, undoOp });
    }
}
