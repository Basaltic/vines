import { useMount } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import { OverlayScrollbars } from 'overlayscrollbars';

const THREADHOLD = 300;
const INCREASE_STEP = 500;

/**
 * 滚动信息
 */
export type ScrollInfo = {
    scrollWidth: string;
    scrollHeight: string;
};

/**
 * 自动调整画板大小的逻辑
 *
 * @param scrollContainerRef
 * @param scrollContentRef
 */
export default function useBoardCanvasScroll(
    scrollContainerRef: React.RefObject<HTMLDivElement>,
    scrollContentRef: React.RefObject<HTMLDivElement>,
): ScrollInfo {
    const { maxX, maxY } = { maxX: 2000, maxY: 2000 };

    const [scrollWidth, setScrollWidth] = useState('100%');
    const [scrollHeight, setScrollHeight] = useState('100%');

    const scrollbarRef = useRef<OverlayScrollbars>();

    /**
     * 虚拟滚轴
     */
    useMount(() => {
        if (scrollContainerRef.current) {
            const scrollbar = OverlayScrollbars(
                {
                    target: scrollContainerRef.current,
                },
                {
                    overflow: { x: 'scroll', y: 'scroll' },
                    scrollbars: { clickScroll: true },
                },
            );

            scrollbarRef.current = scrollbar;
        }
    });

    /**
     * 滑动区域的长宽调整
     */
    useEffect(() => {
        if (scrollbarRef.current) {
            const { overflowAmount } = scrollbarRef.current.state();

            // const rect = scrollContentRef.current.getBoundingClientRect();
            // const w = rect.width;
            // const h = rect.height;
            // const x = rect.x;
            // const y = rect.y;

            // let width = scrollWidth;
            // if (x + w - maxX < THREADHOLD) {
            //     width = `${w + INCREASE_STEP}px`;
            // }

            // let height = scrollHeight;
            // if (y + h - maxY < THREADHOLD) {
            //     height = `${h + INCREASE_STEP}px`;
            // }

            // if (width !== scrollWidth) {
            //     setScrollWidth(width);
            // }
            // if (height !== scrollHeight) {
            //     setScrollHeight(height);
            // }
        }
    }, [scrollContentRef, maxX, maxY, scrollWidth, scrollHeight]);

    return { scrollWidth, scrollHeight };
}
