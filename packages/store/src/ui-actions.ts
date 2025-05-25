import type { UIState } from './ui-state.ts';

import { isFunction, isString } from 'radash';
import type { UIStore } from './ui-store.ts';

/**
 * set[propName] => setPropName
 */
type SetterActions<StateValue> = {
    [K in keyof StateValue as K extends string ? `set${Capitalize<K>}` : never]: (
        value: StateValue[K] | ((prevValue: StateValue[K]) => StateValue[K]),
    ) => any;
};

/**
 * create state actions
 */
export type CreateStateActions<StateValue extends object, Actions extends ActionObjectType> = Actions & Required<SetterActions<StateValue>>;

export type ActionObjectType = {
    [key: string]: ((...args: any[]) => any) | undefined;
};

export type PendingToDefineActionsType = {
    defineActions: (state: UIState<any>) => ActionObjectType;
};

function toLowerCaseFirstChar(str: string) {
    if (str.length === 0) {
        return str;
    }

    return str.charAt(0).toLowerCase() + str.substring(1);
}

/**
 * 标记行为
 *
 * @param state
 * @param actionName 行为名称
 * @param action 行为
 */
function wrapperStateActionsToMarking(state: UIState<any>, actionName: string, action: any) {
    return (...args) => {
        state.context.currentActionKey = actionName;

        const result = action(...args);

        state.context.currentActionKey = '';

        return result;
    };
}

/**
 * create state actions and auto generate get set method
 *
 * @param state
 * @param actions
 * @returns
 */
function createStateActions<S extends object, Actions extends ActionObjectType>(state: UIState<S>, actions?: Actions) {
    return new Proxy(actions as CreateStateActions<S, Actions>, {
        get(target, propName, receiver) {
            if (!isString(propName)) {
                return Reflect.get(target, propName, receiver);
            }

            /**
             * 1.原始属性优先级最高，不可以被覆盖！！！
             */
            if (Reflect.has(target, propName)) {
                const originAction = Reflect.get(target, propName, receiver);

                return wrapperStateActionsToMarking(state, propName, originAction);
            }

            const matched = propName.match(/^set(.*)/) || [];
            const [, capitalizedKey = ''] = matched;
            const wantedStateName = toLowerCaseFirstChar(capitalizedKey);

            /**
             * 生成 set[propName]
             */
            if (matched) {
                const setter = (value: S[keyof S] | ((prevValue: S[keyof S]) => S[keyof S])) => {
                    state.set((prevState) => {
                        const nextValue = isFunction(value) ? value(prevState[wantedStateName]) : value;
                        prevState[wantedStateName] = nextValue;
                        return prevState;
                    });
                };

                return wrapperStateActionsToMarking(state, propName, setter);
            }

            return Reflect.get(target, propName, receiver);
        },
    });
}

/**
 * attach actions on `store`
 *
 * @param store
 * @param pendingToDefineActionsList
 * @returns
 */
export function attachStoreActions<S extends object, Actions extends ActionObjectType>(
    store: UIStore<S, any>,
    pendingToDefineActionsList: PendingToDefineActionsType[],
) {
    const actionEntries = pendingToDefineActionsList
        .map((item) => item.defineActions?.(store.state))
        .filter(Boolean)
        .flatMap((actions) => Object.entries(actions));

    const composedActions = Object.fromEntries(actionEntries);

    if (Object.keys(composedActions).length !== actionEntries.length) {
        console.error('[store] action key is duplicated, please check your code', composedActions);

        if (process.env.NODE_ENV === 'development') {
            throw new Error('[store] action key is duplicated, please check your code');
        }
    }

    const actions = createStateActions<S, Actions>(store.state as any, composedActions as any);

    store.actions = actions;
}
