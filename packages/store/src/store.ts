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
