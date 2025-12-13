import { useInject } from '@vines/core';
import { memo, useCallback } from 'react';
import { ElementDomCache } from '@/workspace/common/cache/element-dom-cache';
import { useCommands } from '@/workspace/graph/use-commands';
import { useCurrentDisplayingVinesNode } from '@/workspace/graph/vines-node-graph.hooks';
import { type Box as DSBox, useSelectionContainer } from '../../../common/components/drag-to-select';

export let isSquareDragging = false;

/**
 * 画板鼠标拖拽选中
 */
export const VinesNodeCanvasMouseSelection = memo(() => {
    const commands = useCommands();
    const displayBoardNode = useCurrentDisplayingVinesNode();
    const elementDomCache = useInject(ElementDomCache);

    /**
     * 处理元素和拖拽方形的求交
     */
    const handleSelectionChange = useCallback(
        async (box: DSBox) => {
            commands.squareDragSelect(box);
        },
        [commands, elementDomCache, displayBoardNode],
    );

    const { DragSelection } = useSelectionContainer({
        eventsElement: document.getElementById('root'),
        onSelectionChange: handleSelectionChange,
        onSelectionStart: () => {
            isSquareDragging = true;
        },
        onSelectionEnd: () => {
            isSquareDragging = false;
        },
        selectionProps: {
            style: {
                border: '2px dashed purple',
                borderRadius: 4,
                backgroundColor: 'brown',
                opacity: 0.5,
            },
        },
    });

    return <DragSelection />;
});
