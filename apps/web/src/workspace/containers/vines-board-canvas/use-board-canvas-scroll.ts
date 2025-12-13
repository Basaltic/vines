import { useMount } from 'ahooks';
import { OverlayScrollbars } from 'overlayscrollbars';
import { useEffect, useState } from 'react';
import { useMaxXY } from '../../graph/vines-node-graph.hooks';

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
    scrollContainerRef: React.RefObject<HTMLDivElement | null>,
    scrollContentRef: React.RefObject<HTMLDivElement | null>,
): ScrollInfo {
    const { maxX, maxY } = useMaxXY();

    const [scrollWidth, setScrollWidth] = useState('100%');
    const [scrollHeight, setScrollHeight] = useState('100%');

    /**
     * 虚拟滚轴
     */
    useMount(() => {
        if (scrollContainerRef.current) {
            OverlayScrollbars(scrollContainerRef.current, {
                overflow: { x: 'scroll', y: 'scroll' },
                scrollbars: { clickScroll: true },
            });
        }
    });

    /**
     * 滑动区域的长宽调整
     */
    useEffect(() => {
        if (scrollContentRef.current) {
            const rect = scrollContentRef.current.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;
            const x = rect.x;
            const y = rect.y;

            let width = scrollWidth;
            if (x + w - maxX < THREADHOLD) {
                width = `${w + INCREASE_STEP}px`;
            }

            let height = scrollHeight;
            if (y + h - maxY < THREADHOLD) {
                height = `${h + INCREASE_STEP}px`;
            }

            if (width !== scrollWidth) {
                setScrollWidth(width);
            }
            if (height !== scrollHeight) {
                setScrollHeight(height);
            }
        }
    }, [scrollContentRef, maxX, maxY, scrollWidth, scrollHeight]);

    return { scrollWidth, scrollHeight };
}
