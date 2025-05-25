import { enableMapSet, enablePatches } from 'immer';

enableMapSet();
enablePatches();

export { type Patch, applyPatches, produceWithPatches } from 'immer';

export * from './ui-store.ts';

export * from './storage/index.ts';
