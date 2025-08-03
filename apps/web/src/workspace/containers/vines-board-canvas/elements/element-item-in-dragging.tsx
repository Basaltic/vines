import { useInject } from '@vines/core';
import { memo } from 'react';
import type { XYCoord } from 'react-dnd';
import { ElementDomCache } from '@/workspace/common/cache/element-dom-cache';
import { VinesNodeDescriptorRegistry } from '@/workspace/vines-node/vines-node-descriptor-registry';
import { useVinesNode } from '@/workspace/vines-node/vines-node-graph.hooks';

/**
 * 画布元素（容器）组件
 */
export const ElementItemInDragging = memo((props: { type: string; draggingNodeId: string; isSelected: boolean; isNew?: boolean }) => {
    const { type, draggingNodeId, isSelected, isNew } = props;
    const elementRegistry = useInject(VinesNodeDescriptorRegistry);
    const ElementView = elementRegistry.getElementView(type);

    if (!ElementView) {
        return null;
    }

    return (
        <div style={{ boxShadow: '0 1px 2px 0 rgba(51,61,78,0.25), 0 0px 0px 1px #e5e3e8' }}>
            <ElementView
                where="dragging"
                id={draggingNodeId}
                type={type}
                isSelected={isSelected}
                isResizable={false}
                isInside={false}
                isDragging={true}
                isNew={isNew}
            />
        </div>
    );
});

/**
 * 渲染相邻的元素
 *
 * @param props
 * @returns
 */
export const SibilingDraggingItem = memo((props: { id: string; deltaOffset: XYCoord }) => {
    const { id, deltaOffset } = props;

    const uvaNode = useVinesNode(id);
    const elementRegistry = useInject(VinesNodeDescriptorRegistry);
    const ElementView = elementRegistry.getElementView(uvaNode.type);
    const elementDomCache = useInject(ElementDomCache);

    const dom = elementDomCache.get(id);
    const rect = dom?.getBoundingClientRect();

    const initialOffset = { x: rect?.x || 0, y: rect?.y || 0 };

    if (!ElementView) {
        return null;
    }

    return (
        <div className="absolute top-0 left-0" style={getSibilingItemStyles(initialOffset, deltaOffset)}>
            <ElementView
                where="dragging"
                id={id}
                type={uvaNode.type}
                isSelected={true}
                isResizable={false}
                isInside={false}
                isDragging={true}
            />
        </div>
    );
});

function getSibilingItemStyles(initialOffset: XYCoord | null, deltaOffset: XYCoord | null): any {
    if (!initialOffset || !deltaOffset) {
        return { display: 'none' };
    }

    let { x, y } = initialOffset;
    x += deltaOffset.x;
    y += deltaOffset.y;

    const transform = `translate(${x}px, ${y}px)`;
    return { transform, WebkitTransform: transform };
}
