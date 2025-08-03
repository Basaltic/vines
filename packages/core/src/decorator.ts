import { BindingScope, inject, injectable, type ServiceIdentifier } from 'inversify';

export const Injectable = (scope?: BindingScope) => injectable(scope || 'Singleton');
export const Inject = inject;

export function createDecorator<T>(id: ServiceIdentifier<T>) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        Inject(id)(target, propertyKey, descriptor);
    };
}
