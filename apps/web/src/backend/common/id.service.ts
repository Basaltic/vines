import { Injectable } from '@viness/core';
import { generateKeyBetween } from '@viness/utils';
import { customAlphabet } from 'nanoid';

const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export type ID = string;

export const DEFAULT_ID_SIZE = 32;

@Injectable()
export class IdentifierService {
    /**
     * Generate unique id
     *
     * @param size
     * @returns
     */
    generateId(size: number = DEFAULT_ID_SIZE): string {
        const nanoid = customAlphabet(DIGITS);
        const id = nanoid(size).toString();
        return id;
    }

    /**
     * 生成两个key之间的中间key
     *
     * @param prev
     * @param next
     * @returns
     */
    generateKeyBetween(prev: string, next: string): string {
        return generateKeyBetween(prev, next, DIGITS);
    }

    getUid() {
        return localStorage.getItem('vines-');
    }
}
