import { Container, createResolve, createWire } from './injection';

export const globaleContainer = new Container();

export const wire = createWire(globaleContainer);
export const resolve = createResolve(globaleContainer);
