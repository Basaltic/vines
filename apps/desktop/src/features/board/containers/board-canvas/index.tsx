import { useRef } from 'react';
import bgSvg from './assets/bg-point.svg';
import useBoardCanvasScroll from './use-board-canvas-scroll';
import { useCurrentNode } from '../../board.store';
import { CardInBoard } from './node-item-in-board';

/**
 * 画板
 */
export function BoardCanvas() {
    const scrollContentRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollInfo = useBoardCanvasScroll(scrollContainerRef, scrollContentRef);
    const currentNodeStore = useCurrentNode();

    const { location } = currentNodeStore.state.use();
    const { headId: lowerHeadId } = location;

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
                    {lowerHeadId && <CardInBoard nodeId={lowerHeadId} />}
                </div>
            </div>
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
