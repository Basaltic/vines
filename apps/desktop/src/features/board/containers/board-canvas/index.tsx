import { useRef } from 'react';
import bgSvg from './assets/bg-point.svg';
import useBoardCanvasScroll from './use-board-canvas-scroll';
import { useCurrentNodeStore } from '../../store/board.store';
import { NodeItemInBoard } from './node-item-in-board';

/**
 * 画板
 */
export function BoardCanvas() {
    const scrollContentRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollInfo = useBoardCanvasScroll(scrollContainerRef, scrollContentRef);
    const currentNodeStore = useCurrentNodeStore();

    const { location } = currentNodeStore.state.use();
    const { lowerHeadId } = location;

    return (
        <>
            <div
                id="board-canvas"
                className="relative w-full h-full bg-slate-200 overflow-auto"
                ref={scrollContainerRef}
                style={{ backgroundImage: `url(${bgSvg})` }}
            >
                <div
                    data-overlayscrollbars-initialize
                    className="relative min-w-full min-h-full"
                    style={{
                        width: scrollInfo.scrollWidth,
                        height: scrollInfo.scrollHeight,
                    }}
                >
                    {lowerHeadId && <NodeItemInBoard nodeId={lowerHeadId} />}
                </div>
            </div>
        </>
    );
}

/**
 * 全局取消使用tab在元素间切换
 */
document.onkeydown = function (t) {
    if (t.key === 'Tab') {
        return false;
    }
};
