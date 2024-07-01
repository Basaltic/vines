export interface IPersistedState<T extends object = object> {
    state: T;
    version: number;
}
