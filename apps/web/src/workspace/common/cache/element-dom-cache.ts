import { Injectable } from '@vines/core';
import type { Cache } from './cache.interface';
export interface IElementDomCache extends Cache<string, HTMLDivElement> {}

/**
 * 元素和DOM之间的关系
 */
@Injectable()
export class ElementDomCache implements IElementDomCache {
    private map = new Map<string, HTMLDivElement>();

    get(k: string): HTMLDivElement | undefined {
        return this.map.get(k);
    }
    set(k: string, v: HTMLDivElement): void {
        this.map.set(k, v);
    }
    del(k: string): boolean {
        return this.map.delete(k);
    }
}
