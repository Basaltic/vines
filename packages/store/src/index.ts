import { enableMapSet, enablePatches } from 'immer';

enableMapSet();
enablePatches();

export { applyPatches, type Patch, produce, produceWithPatches } from 'immer';
export * from './storage';
export * from './store';
export * from './ui-state';
