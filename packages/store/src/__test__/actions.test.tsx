import { createStore } from '../ui-store.ts';
import { act, renderHook } from '@testing-library/react';

describe('createStore', () => {
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
    })();

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

  it('did proxy actions working', () => {
    const defaultState = { hallo: 'world', foo: 'bar' };

    const store = createStore({ name: 'test', defaultState })();

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

  it('multiple call withActions should merge actions', () => {
    const defaultState = { hallo: 'world', foo: 'bar', deep: { wangzi: 'shun' } };

    const useStore1 = createStore({ defaultState }).withActions((state) => {
      return {
        updateHallo: (next: string) => {
          state.set({ hallo: next });
        },
      };
    });

    const useStore2 = useStore1
      .withActions((state) => {
        return {
          updateFoo: (next: string) => {
            state.set((draft) => {
              draft.foo = next;
            });
          },
        };
      })
      .withActions((state) => {
        return {
          updateDeep: (wangzi) => {
            state.set((draft) => {
              draft.deep.wangzi = wangzi;
            });
          },
        };
      });

    expect(useStore1().state.get()).toBe(defaultState);
    expect(useStore2().state.get()).toBe(defaultState);

    expect(useStore1().actions).toEqual(useStore2().actions);

    const renderCheck1 = jest.fn();
    const renderCheck2 = jest.fn();

    renderHook(() => {
      const result = useStore1().state.use();
      renderCheck1(result.foo, result.hallo, result.deep.wangzi);
    });

    renderHook(() => {
      const result = useStore2().state.use();
      renderCheck2(result.foo, result.hallo, result.deep.wangzi);
    });

    expect(renderCheck1).toBeCalledTimes(1);
    expect(renderCheck2).toBeCalledTimes(1);

    act(() => {
      useStore1().actions.updateHallo('next world');
      useStore2().actions.updateFoo('next bar');
      useStore2().actions.updateDeep('next wangzi');
    });

    expect(useStore1().state.get()).toBe(useStore2().state.get());

    expect(renderCheck1).toBeCalledTimes(2);
    expect(renderCheck1).toHaveBeenCalledWith('next bar', 'next world', 'next wangzi');

    expect(renderCheck2).toBeCalledTimes(2);
    expect(renderCheck2).toHaveBeenCalledWith('next bar', 'next world', 'next wangzi');
  });
});
