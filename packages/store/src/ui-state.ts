import { applyPatches, Patch, produce, produceWithPatches } from 'immer';
import { useShallow } from 'zustand/react/shallow';
import { create } from 'zustand';
import { devtools, persist, PersistOptions } from 'zustand/middleware';

export interface StateOption<StateValue extends object> {
  /**
   * state name，it's mainly used to
   */
  name?: string;

  /**
   * default state value
   */
  defaultState: StateValue;

  /**
   * persist options
   */
  persist?: PersistOptions<StateValue>;
}

export type UIState<StateValue extends object> = ReturnType<typeof createState<StateValue>>;

/**
 * create ui state instance
 *
 * @param options
 * @returns
 */
export function createState<StateValue extends object>(options?: StateOption<StateValue>) {
  const { defaultState = {}, name = '' } = options || {};
  let creator: any = () => defaultState;

  if (process.env.NODE_ENV === 'development') {
    creator = devtools(() => defaultState, { name });
  }

  if (options?.persist) {
    creator = persist(creator, options.persist);
  }

  const useStoreHook = create<StateValue>()(creator);

  /**
   * alias `setState` method
   */
  const useStoreHookSetState = useStoreHook.setState as (patch, replace?, devtoolsUsed?) => any;

  const context = { currentActionKey: '' };

  return {
    name,
    defaultState,
    context,
    /**
     * a hook return all the state value and re-render when the state has any changed
     */
    use: () => useStoreHook(),

    /**
     * a hook return selected state values and re-render when the selected values are changed
     *
     * @param selector
     * @returns
     */
    useSelect: <V>(selector: (state: StateValue) => V) => useStoreHook(useShallow(selector)),

    /**
     * select state values
     *
     * @param select
     * @returns
     */
    select: <V>(selector: (state: StateValue) => V) => {
      const s = useStoreHook.getState();

      return selector(s);
    },

    /**
     * get the current state
     */
    get: () => useStoreHook.getState(),

    /**
     * change state
     *
     * @param updater
     * @param replace
     */
    set: (updater: StateValue | Partial<StateValue> | ((draftState: StateValue) => any), replace?: boolean | undefined) => {
      if (typeof updater === 'function' && !replace) {
        useStoreHookSetState(produce(updater) as any, replace, context.currentActionKey);
      } else {
        useStoreHookSetState(updater as any, replace, context.currentActionKey);
      }
    },

    /**
     * subscribe the modification of the state in this state
     */
    subscribe(listener: (state: StateValue, prevState: StateValue) => void): () => void {
      return useStoreHook.subscribe(listener);
    },

    /**
     * change the state and return the patches
     *
     * @param updater
     * @param replace
     * @returns [patches, inverse patches]
     */
    setWithPatches(updater: (state: StateValue) => StateValue | undefined): [Patch[], Patch[]] {
      const state = this.get();
      const [nextState, patches, inversePatches] = produceWithPatches(state, updater) as any;

      useStoreHookSetState(nextState);

      return [patches, inversePatches];
    },

    /**
     * applay change patches to this store state
     *
     * @param patches
     */
    applyPatches(patches: Patch[]) {
      const updater = (s: StateValue) => applyPatches(s, patches);

      useStoreHookSetState(updater);
    },
  };
}

export function createLazyState<StateValue extends object>(option: StateOption<StateValue>) {
  let instance: UIState<StateValue>;

  return new Proxy({} as unknown as UIState<StateValue>, {
    get(_target, key, _receiver) {
      /**
       * react-refresh 会在热更新时检测模块导出的内容是否是近似React组件(通过$$typeof属性进行判断)
       */
      if (!instance && key !== '$$typeof') {
        instance = createState<StateValue>(option);
      }

      return instance[key];
    },
  });
}
