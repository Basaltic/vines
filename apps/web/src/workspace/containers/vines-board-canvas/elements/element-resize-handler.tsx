import React, { useEffect, useRef } from 'react';
import { DragSourceMonitor, useDrag, XYCoord } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

/**
 * 节点元素尺寸变更
 * @returns
 */
export default function ElementResizeHandler(props: {
    minW?: number;
    maxW?: number;
    currW: number;
    hidden?: boolean;
    onDrag: (deltaWidth: number) => void;
    onDragEnd: (deltaWidth: number) => void;
}) {
    const { minW, maxW, currW, hidden, onDrag, onDragEnd } = props;

    const dragHandlerRef = useRef(null);
    const dragBeginCoordRef = useRef<XYCoord>(null);

    /**
     * 拖拽改变大小
     */
    const [, drag, preview] = useDrag({
        type: 'RESIZE_HANDLER',
        item: (monitor: DragSourceMonitor) => {
            dragBeginCoordRef.current = monitor.getClientOffset() as XYCoord;
            return { type: 'RESIZE_HANDLER' };
        },
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
        end: (item, monitor: DragSourceMonitor) => {
            const coord = monitor.getClientOffset() as XYCoord;
            if (dragBeginCoordRef.current) {
                const deltaWidth = coord.x - dragBeginCoordRef.current.x;
                onDragEnd(deltaWidth);
            }
        },
    });

    /**
     * 不显示拖拽
     */
    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    const onDragInner = (e: React.MouseEvent) => {
        if (dragBeginCoordRef.current) {
            const deltaWidth = e.clientX - dragBeginCoordRef.current.x;
            const width = currW + deltaWidth;
            if (maxW && width > maxW) {
                return;
            }

            if (minW && width < minW) {
                return;
            }
            onDrag(deltaWidth);
        }
    };

    drag(dragHandlerRef);

    return (
        <div className="absolute right-0 bottom-0 cursor-nwse-resize" ref={dragHandlerRef} hidden={hidden} onDrag={onDragInner}>
            <svg width="16" height="16" viewBox="0 0 16 16" style={{ width: 12, height: 12 }} xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                    <path
                        fill="#1B2536"
                        d="M13.146 12.146a.5.5 0 0 1 .708.708l-1 1a.5.5 0 0 1-.708-.708zm0-4a.5.5 0 0 1 .708.708l-5 5a.5.5 0 0 1-.708-.708zm0-4a.5.5 0 0 1 .708.708l-9 9a.5.5 0 0 1-.708-.708z"
                        fillOpacity=".5"
                    />
                    <path
                        fill="#FFF"
                        d="M13.146 6.146a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708-.708zm0-4a.5.5 0 0 1 .708.708l-11 11a.5.5 0 0 1-.708-.708zm0 8a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708-.708z"
                        fillOpacity=".7"
                    />
                </g>
            </svg>
        </div>
    );
}
