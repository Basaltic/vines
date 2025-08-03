import { useDragLayer, type XYCoord } from 'react-dnd';
import { useSelectedNodeIds } from '@/workspace/vines-node/vines-node-graph.hooks';
import type { VinesNodeDragItemFromBoard } from '../../vines-node/vines-node-descriptor.types';
import { ElementItemInDragging, SibilingDraggingItem } from './elements/element-item-in-dragging';

/**
 * 元素拖拽的的样式
 * @returns
 */
export const VinesBoardCustomDragLayer = () => {
    const selectedIds = useSelectedNodeIds();

    const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer<{
        item: VinesNodeDragItemFromBoard;
        itemType: string;
        isDragging: boolean;
        initialOffset: XYCoord;
        currentOffset: XYCoord;
    }>((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType() as string,
        initialOffset: monitor.getInitialSourceClientOffset() ?? { x: 0, y: 0 },
        currentOffset: monitor.getSourceClientOffset() ?? { x: 0, y: 0 },
        isDragging: monitor.isDragging(),
    }));

    const deltaOffset = { x: currentOffset.x - initialOffset.x, y: currentOffset.y - initialOffset.y };

    if (!isDragging) {
        return null;
    }

    const { type } = item;

    return (
        <div className="fixed pointer-events-none left-0 top-0 w-full h-full z-50">
            <div className="top-0 left-0 w-fit" style={getItemStyles(initialOffset, currentOffset)}>
                <ElementItemInDragging type={type} draggingNodeId={item.draggingNodeId} isSelected={item.isSelected} isNew={item.isNew} />
            </div>
            {/* 拖动的元素是被选中的情况下才会考虑其他被选中的元素 */}
            {item.isSelected
                ? selectedIds.map((id) =>
                      id !== item.draggingNodeId ? <SibilingDraggingItem key={id} id={id} deltaOffset={deltaOffset} /> : null,
                  )
                : null}
        </div>
    );
};

function getItemStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
    if (!initialOffset || !currentOffset) {
        return { display: 'none' };
    }

    const { x, y } = currentOffset;

    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform,
    };
}
