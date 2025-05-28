import { createStore } from '../ui-store';
import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, vitest } from 'vitest';

describe('createStore', () => {
    it('should create a store, and state common api is working', () => {
        const defaultState = { hallo: 'world' };

        const store = createStore({ name: 'test', defaultState })('test_1');

        expect(store).toBeDefined();

        expect(store.state.get()).toBe(defaultState);
        expect(store.state.name).toBe('test');
        expect(store.state.select((state) => state.hallo)).toBe('world');

        const unlistener = vitest.fn();
        const listener = vitest.fn().mockImplementation(() => unlistener);

        store.state.subscribe(listener);

        expect(listener).toBeCalledTimes(0);
        expect(unlistener).toBeCalledTimes(0);

        store.state.set({ hallo: 'new world' });

        expect(store.state.get().hallo).toBe('new world');
        expect(store.state.select((state) => state.hallo)).toBe('new world');

        expect(listener).toBeCalledTimes(1);
        expect(unlistener).toBeCalledTimes(0);

        store.destory();
    });

    it('use() hook should update when state is changed', () => {
        const defaultState = { deep: { hallo: 'world' } };

        const renderCheck = vitest.fn();

        const store = createStore({ name: 'test', defaultState })('test_2');

        const resp = renderHook(() => {
            const obj = store.state.use();
            renderCheck();

            return obj;
        });

        expect(resp.result.current).toEqual({ deep: { hallo: 'world' } });

        act(() => {
            store.state.set((draft) => {
                draft.deep.hallo = 'next world';
            });
        });

        expect(resp.result.current).toEqual({ deep: { hallo: 'next world' } });
        expect(renderCheck).toHaveBeenCalledTimes(2);
    });

    it('useSelect() hook should update when state is changed', async () => {
        const defaultState = { deep: { hallo: 'world', next: 1 } };
        const store = createStore({ name: 'test', defaultState })('test_3');

        const renderCheck = vitest.fn();

        const resp = renderHook(() => {
            const obj = store.state.useSelect((state) => state.deep.hallo);

            renderCheck();
            return obj;
        });

        expect(resp.result.current).toEqual('world');
        expect(renderCheck).toBeCalledTimes(1);

        act(() => {
            store.state.set((draft) => {
                draft.deep.next = 1;
            });

            store.state.set((draft) => {
                draft.deep.next = 2;
            });
        });

        expect(resp.result.current).toEqual('world');
        expect(renderCheck).toBeCalledTimes(1);

        act(() => {
            store.state.set((draft) => {
                draft.deep.hallo = 'next world 1';
            });

            store.state.set((draft) => {
                draft.deep.hallo = 'next world';
            });
        });

        expect(renderCheck).toBeCalledTimes(2);

        expect(store.state.get().deep.hallo).toBe('next world');
        console.log(resp.result.current);
        expect(resp.result.current).toEqual('next world');

        store.state;
    });
});
