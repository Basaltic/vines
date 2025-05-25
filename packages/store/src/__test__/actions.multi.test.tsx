import { createStore } from '../ui-store.ts';
import { act, renderHook, waitFor } from '@testing-library/react';

describe('createStore 多实例测试', () => {
  it('did user actions working', () => {
    const defaultState = { hallo: 'world', foo: 'bar' };

    const store = createStore({ name: 'test', defaultState }).withActions((state) => {
      return {
        updateHallo: (next: string) => {
          state.set({ hallo: next });
        },
        updateFoo: (next: string) => {
          state.set((draft) => {
            draft.foo = next;
          });
        },
      };
    })('INSTANCE_ID_1');

    expect(store.state.get()).toBe(defaultState);

    const renderCheck = jest.fn();

    renderHook(() => {
      const result = store.state.use();
      renderCheck(result);
    });

    expect(renderCheck).toBeCalledTimes(1);
    expect(renderCheck).toHaveBeenCalledWith({ hallo: 'world', foo: 'bar' });

    act(() => {
      store.actions.updateHallo('next world');
      store.actions.updateFoo('next bar');
    });

    expect(store.state.get()).toEqual({ hallo: 'next world', foo: 'next bar' });

    expect(renderCheck).toBeCalledTimes(2);
    expect(renderCheck).toHaveBeenCalledWith({ hallo: 'next world', foo: 'next bar' });
  });

  it('did proxy actions working', async () => {
    const defaultState = { hallo: 'world', foo: 'bar' };

    const store = createStore({ name: 'test', defaultState })('INSTANCE_ID_2');

    const renderCheck = jest.fn();

    renderHook(() => {
      const result = store.state.use();
      renderCheck(result);
    });

    expect(renderCheck).toBeCalledTimes(1);
    expect(renderCheck).toHaveBeenCalledWith({ hallo: 'world', foo: 'bar' });

    act(() => {
      store.actions.setHallo('next world');
      store.actions.setFoo('next bar');
    });

    expect(renderCheck).toBeCalledTimes(2);

    expect(renderCheck).toHaveBeenCalledWith({ hallo: 'next world', foo: 'next bar' });
  });
});
