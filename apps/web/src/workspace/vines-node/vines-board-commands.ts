import { Inject, Injectable } from '@viness/core';
import { IdentifierService } from '@/backend/common/id.service';
import type { IAppUseCases } from '@/backend/usecase.interface';
import { AppUseCaseToken } from '@/backend/usecase.interface';
import type { Box } from '@/common/components/drag-to-select';
import { OpType } from '../../backend/vines-node-graph/operation/vines-graph-operation.interface';
import { VinesBoardOpHistory } from './vines-board-operation-history';
import { VinesBoardOperationSyncer } from './vines-board-operation-syncer';
import { VinesNode } from './vines-node';
import type { IVinesNode } from './vines-node.interface';
import type { IVinesNodeContent } from './vines-node-content';
import { VinesNodeDescriptorRegistry } from './vines-node-descriptor-registry';
import { VinesNodeGraph } from './vines-node-graph';
import { VinesNodeGraphAtomicOperations } from './vines-node-graph-atomic-operations';

/**
 * 画板编辑器命令
 */
@Injectable()
export class VinesBoardEditorCommands {
    constructor(
        private idService: IdentifierService,
        @Inject(AppUseCaseToken) private appUseCase: IAppUseCases,

        private operationHistory: VinesBoardOpHistory,
        private vinesNodeGraph: VinesNodeGraph,
        private vinesNodeGraphAtomicOperations: VinesNodeGraphAtomicOperations,
        private elementRegistry: VinesNodeDescriptorRegistry,
        private syncer: VinesBoardOperationSyncer,
    ) {}

    // -- Commands with transactions

    /**
     * 撤销
     */
    undo() {
        this.operationHistory.transact(() => {
            this.operationHistory.undo((opGroups) => {
                for (const opGroup of opGroups) {
                    const op = opGroup.undoOp;
                    const payload = op.payload as any;
                    switch (op.type) {
                        case OpType.Insert:
                            this.vinesNodeGraphAtomicOperations.insert(payload);
                            break;
                        case OpType.Delete:
                            this.vinesNodeGraphAtomicOperations.delete(payload);
                            break;
                        case OpType.UpdateContent:
                            this.vinesNodeGraphAtomicOperations.update(payload);
                            break;
                        case OpType.Move:
                            this.vinesNodeGraphAtomicOperations.move(payload);
                            break;
                        default:
                            break;
                    }
                }
            });
        });
    }

    /**
     * 重放
     */
    redo() {
        this.operationHistory.transact(() => {
            this.operationHistory.redo((opGroups) => {
                for (const opGroup of opGroups) {
                    const op = opGroup.redoOp;
                    const payload = op.payload as any;
                    switch (op.type) {
                        case OpType.Insert:
                            this.vinesNodeGraphAtomicOperations.insert(payload);
                            break;
                        case OpType.Delete:
                            this.vinesNodeGraphAtomicOperations.delete(payload);
                            break;
                        case OpType.UpdateContent:
                            this.vinesNodeGraphAtomicOperations.update(payload);
                            break;
                        case OpType.Move:
                            this.vinesNodeGraphAtomicOperations.move(payload);
                            break;
                        default:
                            break;
                    }
                }
            });
        });
    }

    /**
     * 导航
     */
    navigate(navigateToNodeId: string) {
        this.vinesNodeGraph.setDisplayingNodeId(navigateToNodeId);
    }

    /**
     * 创建默认的节点
     *
     * @param payload
     * @param rootState
     */
    insertNode(payload: { type: string; defaultContent?: IVinesNodeContent; above?: string; x?: number; y?: number }) {
        const { type, defaultContent, above = null, x = 50, y = 50 } = payload;

        const content = defaultContent ?? this.elementRegistry.get(type).defaultContent;

        const aboveId = above || this.vinesNodeGraph.state$.get().displayingNodeId;

        const node: IVinesNode = {
            id: this.idService.generateId(),
            type,
            content: content,
        };

        this.operationHistory.transact(() => {
            this.vinesNodeGraphAtomicOperations.insert({ node, to: { x, y, above: aboveId } });
        });
    }

    /**
     * 更改节点内容
     */
    updateNodeContent<T>(payload: { nodeId: string; content: Partial<T> }) {
        this.operationHistory.transact(() => {
            this.vinesNodeGraphAtomicOperations.update(payload);
        });
    }
    /**
     * 更改节点内容 - 不记录
     */
    updateNodeContentWithoutHistory<T>(payload: { nodeId: string; content: Partial<T> }) {
        this.vinesNodeGraphAtomicOperations.update(payload);
    }

    /**
     * 只在画布中移动xy位置
     */
    moveNodePosition(payload: { movingNodeId: string; x: number; y: number }) {
        this.operationHistory.transact(() => {
            const { movingNodeId, x, y } = payload;
            this.vinesNodeGraphAtomicOperations.move({ movingNodeId, to: { x, y } });
        });
    }

    /**
     * 移动所有被选中的节点xy位置
     */
    moveSelectedNodePosition(payload: { deltaOffset: { x: number; y: number } }) {
        this.operationHistory.transact(() => {
            const { deltaOffset } = payload;
            const selectedIdMap = this.vinesNodeGraph.state$.get().selectedNodeIds;
            const selectedNodeIds = Object.keys(selectedIdMap);
            for (const selectedNodeId of selectedNodeIds) {
                const selectedNode = this.vinesNodeGraph.getNode(selectedNodeId);

                const { x = 0, y = 0 } = selectedNode || {};

                const toX = x + deltaOffset.x;
                const toY = y + deltaOffset.y;
                this.vinesNodeGraphAtomicOperations.move({
                    movingNodeId: selectedNodeId,
                    to: { x: toX, y: toY, above: undefined },
                });
            }
        });
    }

    /**
     * 把节点移动到某个节点之后
     */
    moveAfter(payload: { movingNodeId: string; afterNodeId: string; parentId: string }) {
        this.operationHistory.transact(() => {
            const { movingNodeId, afterNodeId, parentId } = payload;

            if (movingNodeId === afterNodeId) return;

            const to = { above: parentId, prev: afterNodeId };

            this.vinesNodeGraphAtomicOperations.move({ movingNodeId, to });
        });
    }

    /**
     * 把选中的所有节点移动到某个节点之后
     */
    moveSelectedAfter(payload: { afterNodeId: string; parentId: string }) {
        this.operationHistory.transact(() => {
            const { afterNodeId, parentId } = payload;

            const selectedIdMap = this.vinesNodeGraph.state$.get().selectedNodeIds;
            const selectedNodeIds = Object.keys(selectedIdMap);

            let prevId = afterNodeId;
            for (const movingNodeId of selectedNodeIds) {
                const to = { above: parentId, prev: prevId };

                this.vinesNodeGraphAtomicOperations.move({ movingNodeId, to });

                prevId = movingNodeId;
            }
        });
    }

    /**
     * 把节点移动到某个节点之前
     */
    moveBefore(payload: { movingNodeId: string; beforeNodeId: string; parentId: string }) {
        this.operationHistory.transact(() => {
            const { movingNodeId, beforeNodeId, parentId } = payload;

            if (movingNodeId === beforeNodeId) return;

            const to = { above: parentId, next: beforeNodeId };

            this.vinesNodeGraphAtomicOperations.move({ movingNodeId, to });
        });
    }

    /**
     * 把选中的所有节点移动到某个节点之前
     */
    moveSelectedBefore(payload: { beforeNodeId: string; parentId: string }) {
        this.operationHistory.transact(() => {
            const { beforeNodeId, parentId } = payload;

            const selectedIdMap = this.vinesNodeGraph.state$.get().selectedNodeIds;
            const selectedNodeIds = Object.keys(selectedIdMap);

            let nextId = beforeNodeId;
            for (const movingNodeId of selectedNodeIds) {
                const to = { above: parentId, next: nextId };

                this.vinesNodeGraphAtomicOperations.move({ movingNodeId, to });

                nextId = movingNodeId;
            }
        });
    }

    /**
     * 移动到空的看板中
     */
    moveToLast(payload: { movingNodeId: string; parentId: string }) {
        this.operationHistory.transact(() => {
            const { movingNodeId, parentId } = payload;

            const to = { above: parentId };

            this.vinesNodeGraphAtomicOperations.move({ movingNodeId, to });
        });
    }

    /**
     * 把选中的所有节点移动到空的看板中
     */
    moveSelectedToLast(payload: { parentId: string }) {
        this.operationHistory.transact(() => {
            const { parentId } = payload;
            const selectedIdMap = this.vinesNodeGraph.state$.get().selectedNodeIds;
            const selectedNodeIds = Object.keys(selectedIdMap);

            for (const movingNodeId of selectedNodeIds) {
                const to = { above: parentId };

                this.vinesNodeGraphAtomicOperations.move({ movingNodeId, to });
            }
        });
    }

    /**
     * 任何地方移动到画板中
     */
    moveToBoard(payload: { movingNodeId: string; boardNodeId?: string; x: number; y: number }) {
        this.operationHistory.transact(() => {
            const { movingNodeId, boardNodeId, x, y } = payload;

            if (!boardNodeId) return;

            const to = { above: boardNodeId, x, y };

            this.vinesNodeGraphAtomicOperations.move({ movingNodeId, to });
        });
    }

    // -- Commands without transactions

    startSync() {
        this.syncer.start();
    }

    stopSync() {
        this.syncer.stop();
    }

    squareDragSelect(box: Box) {
        // return this.nodeGraph.squareDragSelect(box);
    }

    selectNode(id: string) {
        return this.vinesNodeGraph.addSelectedNodeIds([id]);
    }
    deselectNode(id: string) {
        return this.vinesNodeGraph.removeSelectedNodeIds([id]);
    }
    selectNodeAndDeselectOthers(id: string) {
        this.vinesNodeGraph.setSelectedNodeIds({ [id]: true });
    }

    /**
     * 初始化
     */
    async initialize(workspaceId: string): Promise<void> {
        console.log('start initializing ~~');

        const stateResp = await this.appUseCase.getWorkspace({ id: workspaceId });

        const displayingNodeId = stateResp.data?.displayingNodeId;

        if (!displayingNodeId) return;

        this.vinesNodeGraph.setDisplayingNodeId(displayingNodeId);

        const allNodesResp = await this.appUseCase.getAllNodes();
        const allRawNodes = allNodesResp.data?.list || [];

        for (const rawNode of allRawNodes) {
            const vinesNode = VinesNode.createByEntity(rawNode);
            this.vinesNodeGraph.setNode(vinesNode);
        }

        for (const rawNode of allRawNodes) {
            const { above } = rawNode;
            const aboveNode = this.vinesNodeGraph.getNode(above);

            aboveNode?.appendChild(rawNode.id);
        }

        /**
         * 全局取消使用tab在元素间切换
         */
        document.onkeydown = (t) => {
            if (t.key === 'Tab') {
                return false;
            }
        };

        console.log('end initializing ~~ ');
    }
}
