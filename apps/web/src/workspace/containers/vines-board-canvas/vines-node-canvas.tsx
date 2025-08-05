import { useRef } from 'react';
import { useCurrentDisplayingVinesNode } from '@/workspace/vines-node/vines-node-graph.hooks';
import bgSvg from './assets/bg-point.svg';
import { ElementItemInBoard } from './elements/element-item-in-board';
import useBoardCanvasScroll from './use-board-canvas-scroll';
import useVinesBoardHotKeys from './use-board-hotkeys';
import useElementDropToBoard from './use-element-drop-to-board';
import { VinesNodeCanvasMouseSelection } from './vines-node-canvas-mouse-selection';

/**
 * 画布
 */
export function VinesNodeCanvas() {
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
                id="uva-board-canvas"
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
                        <ElementItemInBoard key={id} isResizable nodeId={id} />
                    ))}
                </div>
            </div>

            <VinesNodeCanvasMouseSelection />
        </>
    );
}

/**
 * 全局取消使用tab在元素间切换
 */
document.onkeydown = (t) => {
    if (t.key === 'Tab') {
        return false;
    }
};
