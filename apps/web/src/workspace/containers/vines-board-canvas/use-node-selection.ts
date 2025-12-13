import { useEffect, useRef } from 'react';
import { useCommands } from '@/workspace/graph/use-commands';
import { useIsNodeSelected } from '@/workspace/graph/vines-node-graph.hooks';

/**
 * 节点是否被选中
 */
export const useVinesNodeSelection = (id: string) => {
    const shiftHoldingRef = useRef(false);

    const commands = useCommands();

    const isNodeSelected = useIsNodeSelected(id);

    useEffect(() => {
        window.addEventListener('keyup', upHandler);
        window.addEventListener('keydown', downHandler);

        return () => {
            window.removeEventListener('keyup', upHandler);
            window.removeEventListener('keydown', downHandler);
        };
    });

    const upHandler = (e: KeyboardEvent) => {
        if (e.key === 'Shift') {
            shiftHoldingRef.current = false;
        }
    };
    const downHandler = (e: KeyboardEvent) => {
        if (e.key === 'Shift') {
            shiftHoldingRef.current = true;
        }
    };

    /**
     * 选中节点
     */
    const selectNode = () => {
        if (shiftHoldingRef.current) {
            commands.selectNode(id);
        } else {
            commands.selectNodeAndDeselectOthers(id);
        }
    };

    /**
     * 反选节点
     */
    const deselectNode = () => {
        if (!shiftHoldingRef.current) commands.deselectNode(id);
    };

    return { isNodeSelected, selectNode, deselectNode };
};
