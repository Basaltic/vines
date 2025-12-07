import { Injectable } from '@vines/core';
import { Store } from '@vines/store';
import { ID } from '@/backend/common/id.service';
import { VinesNode } from './vines-node';
import { IVinesNodeContent } from './vines-node-content.types';

export interface VinesNodeGraphCommonState {
    // 当前展示节点
    displayingNodeId: string;
    // 选中的节点id
    selectedNodeIds: Record<string, boolean>;
}

export const DEFAULT_NODE_GRAPH_STATE: VinesNodeGraphCommonState = {
    displayingNodeId: '',
    selectedNodeIds: {},
};

@Injectable()
export class VinesNodeGraph extends Store<VinesNodeGraphCommonState> {
    private vinesNodeMap = new Map<ID | undefined | null, VinesNode>();

    getNode<C extends IVinesNodeContent>(nodeId?: ID | null) {
        return this.vinesNodeMap.get(nodeId) as VinesNode<C> | undefined;
    }

    setNode(node: VinesNode) {
        return this.vinesNodeMap.set(node.id, node);
    }

    setNodes(nodes: VinesNode[]) {
        for (const node of nodes) {
            this.setNode(node);
        }
    }

    setDisplayingNodeId(nodeId: ID) {
        this.state$.set({ displayingNodeId: nodeId });
    }

    setSelectedNodeIds(nodeIds: Record<string, boolean>) {
        this.state$.set({ selectedNodeIds: nodeIds });
    }

    resetSelectedNodeIds() {
        this.state$.set({ selectedNodeIds: {} });
    }

    addSelectedNodeIds(nodeIds: string[]) {
        this.state$.set((draft) => {
            nodeIds.forEach((nodeId) => {
                draft.selectedNodeIds[nodeId] = true;
            });
        });
    }

    removeSelectedNodeIds(nodeIds: string[]) {
        this.state$.set((draft) => {
            nodeIds.forEach((nodeId) => {
                draft.selectedNodeIds[nodeId] = false;
                delete draft.selectedNodeIds[nodeId];
            });
        });
    }

    /**
     *
     * @param nodeIdToDelete
     */
    deleteNode(nodeIdToDelete: ID) {
        const nodeToDelete = this.getNode(nodeIdToDelete);
        if (nodeToDelete) {
            const { above } = nodeToDelete.state$.get();

            if (above) {
                const aboveNode = this.getNode(above);
                aboveNode?.removeChild(nodeIdToDelete);
            }

            this.vinesNodeMap.delete(nodeIdToDelete);
        }
    }

    /**
     *
     * @param nodeId
     * @param content
     * @returns
     */
    updateNodeContent<C>(nodeId: string, content: Partial<C>) {
        const node = this.getNode(nodeId);
        return node?.updateContent(content);
    }
}
