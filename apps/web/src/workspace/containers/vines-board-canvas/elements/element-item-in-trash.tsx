import { useInject } from '@vines/core';
import { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { VinesNodeDescriptorRegistry } from '@/workspace/vines-node/vines-node-descriptor-registry';
import { useVinesNode } from '@/workspace/vines-node/vines-node-graph.hooks';
import { useDragSelectMouseConflictHandler } from '../../../../common/components/drag-to-select/hooks/use-drag-select-mouse-conflict-handler';
import type { VinesNodeDragItemFromTrash } from '../../../vines-node/vines-node-descriptor.types';

/**
 * 回收站中的元素组件
 */
export function ElementItemInTrash(props: { nodeId: string }) {
    const { nodeId } = props;

    const containerRef = useRef<HTMLDivElement>(null);

    useDragSelectMouseConflictHandler(containerRef);

    const uvaNode = useVinesNode(nodeId);
    const elementRegistry = useInject(VinesNodeDescriptorRegistry);
    const ElementView = elementRegistry.getElementView(uvaNode.type);

    /**
     * 节点的拖拽逻辑
     * 1. 节点被选中的情况下不能被拖动
     */
    const [{ isDragging }, drag, preview] = useDrag<VinesNodeDragItemFromTrash, {}, { isDragging: boolean }>({
        type: `${uvaNode.type}_trash`,
        item: () => ({ draggingNodeId: nodeId }),
        collect: (monitor) => {
            return { isDragging: monitor.isDragging() };
        },
        canDrag: () => true,
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    drag(containerRef);

    if (!ElementView) return null;

    return (
        <>
            <div className="mb-1" ref={containerRef} key={uvaNode.id}>
                <ElementView where="trash" id={uvaNode.id} isDragging={isDragging} isSelected={false} />
            </div>
            {/* {uvaNode.location.nextId && <ElementItemInTrash nodeId={uvaNode.location.nextId} />} */}
        </>
    );
}
