import cs from 'classnames';
import type React from 'react';
import { memo, useRef } from 'react';
import { useVinesNodeDescriptor } from '@/workspace/vines-node/vines-node-descriptor-registry.hooks';
import { useVinesNode } from '@/workspace/vines-node/vines-node-graph.hooks';
import { useDragSelectMouseConflictHandler } from '../../../../common/components/drag-to-select/hooks/use-drag-select-mouse-conflict-handler';
import type { TWhere } from '../../../vines-node/vines-node-descriptor.types';
import { useElementDomCollect } from '../hooks/use-element-dom-collect';
import { useElementDrag } from '../hooks/use-element-drag';
import { useVinesNodeSelection } from '../use-node-selection';

/**
 * 画布元素（容器）组件
 */
export const ElementItemInBoard = memo((props: { nodeId: string; isResizable: boolean; where?: TWhere }) => {
    const { where, nodeId, isResizable } = props;

    const draggableRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const vinesNode = useVinesNode(nodeId);
    const vinesNodeDescriptor = useVinesNodeDescriptor(vinesNode.type);

    const { isNodeSelected, selectNode } = useVinesNodeSelection(nodeId);

    const { isDragging } = useElementDrag({
        draggableElementRef: draggableRef,
        draggingNodeId: vinesNode.id,
        isSelected: isNodeSelected,
        where: where || 'board',
        type: vinesNode.type,
    });

    useDragSelectMouseConflictHandler(containerRef);
    useElementDomCollect(nodeId, containerRef);

    /**
     * 点击选中
     */
    const clickToSelect = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!isNodeSelected) {
            selectNode();
        }
    };

    // 节点位置
    const { x = 0, y = 0 } = vinesNode;

    // 节点展示内容
    const VinesNodeView = vinesNodeDescriptor?.view;

    if (!VinesNodeView) {
        return null;
    }

    console.log('ElementItemInBoard', { nodeId, isNodeSelected, isDragging, where });

    const containerClassName = cs('absolute', isDragging ? 'opacity-0' : 'opacity-100', isNodeSelected ? 'z-40' : '');
    const draggableWrapperClassName = cs('relative bg-white', isNodeSelected ? 'ring-2 ring-slate-600 z-50' : 'ring-1 ring-slate-200');

    return (
        <div
            id={nodeId}
            ref={containerRef}
            className={containerClassName}
            style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
            data-id={vinesNode.id}
            onClick={clickToSelect}
        >
            <div ref={draggableRef} className={draggableWrapperClassName}>
                <VinesNodeView
                    where={where || 'board'}
                    id={nodeId}
                    type={vinesNode.type}
                    isSelected={isNodeSelected}
                    isResizable={isResizable}
                    isDragging={isDragging}
                />
            </div>
        </div>
    );
});
