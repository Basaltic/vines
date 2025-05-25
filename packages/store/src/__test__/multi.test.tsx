import { createStore } from '../ui-store.ts';

describe('createStore', () => {
  it('should create a store, and state common api is working', () => {
    const defaultState = { hallo: 'world' };

    const store1 = createStore({ name: 'test', defaultState })('test_1');

    const store2 = createStore({ name: 'test', defaultState })('test_2');

    expect(store1).toBeDefined();
    expect(store2).toBeDefined();

    expect(store1.state.get()).toBe(defaultState);
    expect(store2.state.get()).toBe(defaultState);

    const unlistener1= jest.fn();
    const listener1 = jest.fn().mockImplementation(() => unlistener1);

    const unlistener2= jest.fn();
    const listener2 = jest.fn().mockImplementation(() => unlistener2);


    store1.state.subscribe(listener1);
    store2.state.subscribe(listener2);

    expect(listener1).toBeCalledTimes(0);
    expect(unlistener1).toBeCalledTimes(0);

    expect(listener2).toBeCalledTimes(0);
    expect(unlistener2).toBeCalledTimes(0);


    store1.state.set({ hallo: 'new world 1' });
    store2.state.set({ hallo: 'new world 2' });

    expect(store1.state.get().hallo).toBe('new world 1');
    expect(store1.state.select((state) => state.hallo)).toBe('new world 1');

    expect(store2.state.get().hallo).toBe('new world 2');
    expect(store2.state.select((state) => state.hallo)).toBe('new world 2');


    expect(listener1).toBeCalledTimes(1);
    expect(unlistener1).toBeCalledTimes(0);

    expect(listener2).toBeCalledTimes(1);
    expect(unlistener2).toBeCalledTimes(0);

  });
});
