import type { Editor } from '@tiptap/core';
import { Injectable } from '@vines/core';
import type { Cache } from './cache.interface';

export interface IEditorCache extends Cache<string, Editor> {}

/**
 * 编辑器实例缓存
 */
@Injectable()
export class EditorCache implements IEditorCache {
    private map = new Map<string, Editor>();

    get(k: string): Editor | undefined {
        return this.map.get(k);
    }
    set(k: string, v: Editor): void {
        this.map.set(k, v);
    }
    del(k: string): boolean {
        return this.map.delete(k);
    }
}
