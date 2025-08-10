import { createModule } from '@vines/core';
import { enableMapSet, enablePatches } from 'immer';
import { createState, type StateOption, type UIState } from './ui-state';

/**
 * Extend this class to create a store
 */
export abstract class Store<StateValue extends object> {
    state$: UIState<StateValue>;
    constructor(option: StateOption<StateValue>) {
        this.state$ = createState(option);
    }
}

export class StoreModule {
    static forRoot() {
        enableMapSet();
        enablePatches();
        return createModule({});
    }
}
