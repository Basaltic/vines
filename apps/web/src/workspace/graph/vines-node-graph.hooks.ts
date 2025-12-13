import { useInject } from '@vines/core';
import { VinesNode } from './vines-node';
import { IVinesNodeContent } from './vines-node-content.types';
import { VinesNodeGraph } from './vines-node-graph';

export const useVinesNodeGraph = () => {
    return useInject(VinesNodeGraph);
};

/**
 * 通过节点id，订阅状态中该节点
 */
export function useVinesNode<C extends IVinesNodeContent = IVinesNodeContent>(nodeId: string) {
    const nodeGraph = useVinesNodeGraph();
    const node = nodeGraph.getNode<C>(nodeId);
    return node as any as VinesNode<C>;
}

/**
 * 获取当前以画板形式展示的节点
 */
export const useCurrentDisplayingVinesNode = () => {
    const nodeGraph = useVinesNodeGraph();
    const displayingNodeId = nodeGraph.state$.useSelect((state) => state.displayingNodeId);
    const node = useVinesNode(displayingNodeId);
    return node;
};

/**
 * 获取从当前展示的画板节点到根节点的所有的画板节点
 */
export const useSelectBoardNodesInPath = () => {
    const nodeGraph = useVinesNodeGraph();
    let displayingNodeId = nodeGraph.state$.useSelect((state) => state.displayingNodeId);

    const boardNodesInPath: any[] = [];

    while (displayingNodeId) {
        const node = nodeGraph.getNode(displayingNodeId);

        if (node) {
            boardNodesInPath.unshift(node);
        }

        displayingNodeId = node?.above as any;
    }

    return boardNodesInPath;
};

/**
 * max x, y
 */
export const useMaxXY = () => {
    return { maxX: 1000, maxY: 1000 };
};

export const useIsNodeSelected = (id: string) => {
    const nodeGraph = useVinesNodeGraph();
    const selectedNodeId = nodeGraph.state$.useSelect((state) => state?.selectedNodeIds?.[id]);
    return Boolean(selectedNodeId);
};

export const useSelectedNodeIds = () => {
    const nodeGraph = useVinesNodeGraph();
    const selectedIdsObj = nodeGraph.state$.useSelect((state) => state.selectedNodeIds);
    const selectedIds = Object.keys(selectedIdsObj || {});
    return selectedIds;
};
