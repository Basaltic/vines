import clamp from 'lodash-es/clamp';
import { useDrop, type XYCoord } from 'react-dnd';
import { useCommands } from '@/workspace/graph/use-commands';
import { useDragableAccepts } from '@/workspace/graph/vines-node-descriptor-registry.hooks';
import type {
    VinesNodeDragItemFromBoard,
    VinesNodeDragItemFromColumn,
    VinesNodeDragItemFromMenu,
} from '../../graph/vines-node-descriptor.types';

/**
 * 元素拖拽到画板
 */
export default function useElementDropToBoard(
    dropAreaContainerRef: React.RefObject<HTMLDivElement | null>,
    scrollContentRef: React.RefObject<HTMLDivElement | null>,
    boardNodeId?: string,
) {
    const commands = useCommands();

    const { itemTypeFromMenu, itemTypeFromNode, itemTypeFromTrash, itemTypeFromColumn } = useDragableAccepts();

    /**
     * 元素移动检测
     */
    const [, dropFromBoard] = useDrop(
        {
            accept: itemTypeFromNode,
            drop: async (item: VinesNodeDragItemFromBoard, monitor) => {
                const { draggingNodeId, isSelected } = item;

                // 如果已经有内部的元素处理了drop事件，那么不再处理本逻辑
                const didDrop = monitor.didDrop();
                if (didDrop) return;

                const rect = scrollContentRef.current?.getBoundingClientRect();
                if (!rect) return;
                console.log('board -> board');

                // 1. 有id表示是已经存在的元素，移动之，否则新建之
                // 如果有多个选中的，需要更改所有被选中的元素的位置
                const currentOffset = monitor.getSourceClientOffset() as XYCoord;
                const initialOffset = monitor.getInitialSourceClientOffset() as XYCoord;

                if (isSelected) {
                    // 当拖动元素是选中的情况下，需要考虑其他选中的元素的位置变换
                    const deltaOffset = { x: currentOffset.x - initialOffset.x, y: currentOffset.y - initialOffset.y };
                    commands.moveSelectedNodePosition({ deltaOffset });
                } else {
                    const x = clamp(currentOffset.x - rect.x, 0, Number.MAX_VALUE);
                    const y = clamp(currentOffset.y - rect.y, 0, Number.MAX_VALUE);

                    commands.moveNodePosition({ movingNodeId: draggingNodeId, x, y });
                }
            },
        },
        [boardNodeId, commands],
    );

    /**
     * 从列表中拖拽
     */
    const [, dropFromColumn] = useDrop(
        {
            accept: itemTypeFromColumn,
            drop: async (item: VinesNodeDragItemFromColumn, monitor) => {
                const didDrop = monitor.didDrop();
                if (didDrop) return;

                const rect = scrollContentRef.current?.getBoundingClientRect();
                if (!rect) return;

                console.log('column -> board');

                const { draggingNodeId } = item;

                const currentOffset = monitor.getSourceClientOffset() as XYCoord;
                const x = clamp(currentOffset.x - rect.x, 0, Number.MAX_VALUE);
                const y = clamp(currentOffset.y - rect.y, 0, Number.MAX_VALUE);

                commands.moveToBoard({ movingNodeId: draggingNodeId, boardNodeId, x, y });
            },
        },
        [boardNodeId, commands],
    );

    /**
     * 从菜单中拖拽过来 - 新建节点
     */
    const [, dropFromMenu] = useDrop(
        {
            accept: itemTypeFromMenu,
            drop: async (item: VinesNodeDragItemFromMenu, monitor) => {
                const didDrop = monitor.didDrop();
                if (didDrop) return;

                console.log('menu -> board');

                const { type } = item;
                const currentOffset = monitor.getSourceClientOffset() as XYCoord;
                const x = clamp(currentOffset.x, 0, Number.MAX_VALUE);
                const y = clamp(currentOffset.y, 0, Number.MAX_VALUE);

                commands.insertNode({ type, x, y });
            },
        },
        [boardNodeId, commands],
    );

    /**
     * 从废纸篓中拖拽过来
     */
    const [, dropFromTrash] = useDrop(
        {
            accept: itemTypeFromTrash,
            drop: async (item: VinesNodeDragItemFromBoard, monitor) => {
                const didDrop = monitor.didDrop();
                if (didDrop) return;

                const rect = scrollContentRef.current?.getBoundingClientRect();
                if (!rect) return;

                console.log('trash -> board');

                const { draggingNodeId } = item;

                const currentOffset = monitor.getClientOffset() as XYCoord;
                const x = clamp(currentOffset.x - rect.x, 0, Number.MAX_VALUE);
                const y = clamp(currentOffset.y - rect.y, 0, Number.MAX_VALUE);

                commands.moveToBoard({ movingNodeId: draggingNodeId, boardNodeId, x, y });
            },
        },
        [boardNodeId, commands],
    );

    dropFromBoard(dropAreaContainerRef);
    dropFromMenu(dropAreaContainerRef);
    dropFromTrash(dropAreaContainerRef);
    dropFromColumn(dropAreaContainerRef);
}
