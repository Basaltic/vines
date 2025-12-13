import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import type { TWhere, VinesNodeDragItemFromBoard } from '../../../graph/vines-node-descriptor.types';

let isSomeElementDragging = false;

/**
 * 画板中元素拖拽逻辑
 *
 * @param props
 * @returns
 */
export function useElementDrag(props: {
    draggableElementRef: React.RefObject<HTMLDivElement | null>;
    draggingNodeId: string;
    isSelected: boolean;
    where: TWhere;
    type: string;
}) {
    const { draggableElementRef, draggingNodeId, isSelected, where, type } = props;

    /**
     * 节点的拖拽逻辑
     * 1. 节点被选中的情况下不能被拖动
     */
    const [{ isDragging }, drag, preview] = useDrag<VinesNodeDragItemFromBoard, {}, { isDragging: boolean }>(
        {
            type: `${type}_${where}`,
            item: () => {
                isSomeElementDragging = true;
                return { draggingNodeId, type, isSelected };
            },

            collect: (monitor) => {
                const isDragging = monitor.isDragging() || (isSomeElementDragging && isSelected);
                return { isDragging };
            },
            canDrag: () => true,
            end: () => {
                isSomeElementDragging = false;
            },
        },
        [type, draggingNodeId, isSelected, isSomeElementDragging],
    );

    /**
     * 默认拖拽效果设置为空白
     */
    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    drag(draggableElementRef);

    return { isDragging };
}
