import { useInject } from '@vines/core';
import type React from 'react';
import { useEffect } from 'react';
import { ElementDomCache } from '@/workspace/common/cache/element-dom-cache';

/**
 * 收集 卡片元素 和 真实dom元素的映射
 *
 * @param nodeId
 * @param containerRef
 */
export const useElementDomCollect = (nodeId: string, containerRef: React.RefObject<HTMLDivElement | null>) => {
    const elementDomCache = useInject(ElementDomCache);

    useEffect(() => {
        if (containerRef.current) {
            elementDomCache.set(nodeId, containerRef.current);
        }
        return () => {
            elementDomCache.del(nodeId);
        };
    }, [nodeId, elementDomCache]);
};
