import { useRef } from 'react';
import { useCurrentDisplayingVinesNode } from '@/workspace/vines-node/vines-node-graph.hooks';
import bgSvg from './assets/bg-point.svg';
import useBoardCanvasScroll from './use-board-canvas-scroll';
import useVinesBoardHotKeys from './use-board-hotkeys';
import useElementDropToBoard from './use-element-drop-to-board';
import { VinesNodeCanvasMouseSelection } from './vines-node-canvas-mouse-selection';
import { ElementItemInBoard } from './vines-node-views/element-item-in-board';

/**
 * 画布
 */
export function CardCanvas() {
    const scrollContentRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollInfo = useBoardCanvasScroll(scrollContainerRef, scrollContentRef);
    const displayBoardNode = useCurrentDisplayingVinesNode();

    const childNodeIds = displayBoardNode?.state$.useSelect((n) => n.children);

    useElementDropToBoard(scrollContainerRef, scrollContentRef, displayBoardNode?.id);

    useVinesBoardHotKeys();

    return (
        <>
            <div
                id="vines-board-canvas"
                className="relative w-full h-full bg-slate-200 overflow-auto"
                ref={scrollContainerRef}
                style={{ backgroundImage: `url(${bgSvg})` }}
            >
                <div
                    ref={scrollContentRef}
                    className="relative min-w-full min-h-full"
                    style={{
                        width: scrollInfo.scrollWidth,
                        height: scrollInfo.scrollHeight,
                    }}
                >
                    {childNodeIds?.map((id) => (
                        <ElementItemInBoard key={id} isResizable nodeId={id} where="board" />
                    ))}
                </div>
            </div>

            <VinesNodeCanvasMouseSelection />
        </>
    );
}
