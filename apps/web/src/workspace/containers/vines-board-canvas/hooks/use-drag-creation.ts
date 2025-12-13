import type React from 'react';
import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import type { VinesNodeDragItemFromMenu } from '../../../graph/vines-node-descriptor.types';

/**
 * 从图标拖拽创建新的节点
 *
 * @param type
 * @returns
 */
export function useDragCreation(containerRef: React.RefObject<HTMLDivElement | null>, type: string) {
    /**
     * 节点的拖拽创建
     */
    const [{ isDragging }, drag, preview] = useDrag<VinesNodeDragItemFromMenu, {}, { isDragging: boolean }>({
        type: `${type}_menu`,
        item: () => {
            return { type, isNew: true };
        },
        collect: (monitor) => {
            return { isDragging: monitor.isDragging() };
        },
        canDrag: () => true,
        end: () => {},
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    drag(containerRef);

    return { isDragging };
}
