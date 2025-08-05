import { Injectable } from '@vines/core';
import type { Cache } from '../../../common/cache.interface';
export interface IFileCache extends Cache<string, File> {}

/**
 * 文件实例缓存
 */
@Injectable()
export class FileCache implements IFileCache {
    private map = new Map<string, File>();

    get(k: string): File | undefined {
        return this.map.get(k);
    }
    set(k: string, v: File): void {
        this.map.set(k, v);
    }
    del(k: string): boolean {
        return this.map.delete(k);
    }
}
