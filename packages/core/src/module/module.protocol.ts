import type { Factory, NewAble, Token, Value } from '../injection';
import type { Scope } from './scope';

export type ClassProvider<T> = {
    token: Token<T, any>;
    useClass: NewAble<T, any>;
    /**
     * @default Scope.Singleton
     */
    scope?: Scope;
};
export type ValueProvider<T> = {
    token: Token<T, any>;
    useValue: Value<T>;
    scope?: Scope;
};
export type FactoryProvider<T> = {
    token: Token<T, any>;
    useFactory: Factory<T, any>;
    /**
     * @default Scope.Singleton
     */
    scope?: Scope;
};

export type Provider<T = any> = ClassProvider<T> | ValueProvider<T> | FactoryProvider<T>;

export interface ModuleMetadata {
    imports?: Module[];
    providers?: Provider[];
}

export interface Module extends ModuleMetadata {}

export function isClassProvider<T>(provider: Provider<T>): provider is ClassProvider<any> {
    return !!(provider as ClassProvider<T>).useClass;
}

export function isValueProvider<T>(provider: Provider<T>): provider is ValueProvider<any> {
    return !!(provider as ValueProvider<T>).useValue;
}

export function isFactoryProvider<T>(provider: Provider<T>): provider is FactoryProvider<any> {
    return !!(provider as FactoryProvider<T>).useFactory;
}
