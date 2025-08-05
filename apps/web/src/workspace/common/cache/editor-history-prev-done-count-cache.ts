import { Injectable } from '@vines/core';
import type { Cache } from '../../../common/cache.interface';
export interface IEditorHistoryPrevDoneCountCache extends Cache<string, number> {}

/**
 * 编辑器历史记录数量缓存
 */
@Injectable()
export class EditorHistoryPrevDoneCountCache implements IEditorHistoryPrevDoneCountCache {
    private map = new Map<string, number>();

    get(k: string): number | undefined {
        return this.map.get(k);
    }
    set(k: string, v: number): void {
        this.map.set(k, v);
    }
    del(k: string): boolean {
        return this.map.delete(k);
    }
}
