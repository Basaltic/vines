export interface Cache<K, V> {
    get(k: K): V | undefined;
    set(k: K, v: V): void;
    del(k: K): boolean;
}
