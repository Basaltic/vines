import { SyncDescriptor } from "./descriptors";
import type { BrandedService, ServiceIdentifier } from "./instantiation";
import { ServiceCollection } from "./service-collection";

export const enum InstantiationType {
  /**
   * Instantiate this service as soon as a consumer depdends on it. _Note_ that this
   * is more costly as some upfront work is done that is likely not needed
   */
  Eager = 0,

  /**
   * Instantiate this service as soon as a consumer uses it. This is the _better_
   * way of registering a service.
   */
  Delayed = 1,
}

export interface IServiceRegistry {
  register<T, Services extends BrandedService[]>(
    id: ServiceIdentifier<T>,
    ctor: new (...services: Services) => T,
    supportsDelayedInstantiation?: InstantiationType
  ): void;
  register<T, Services extends BrandedService[]>(
    id: ServiceIdentifier<T>,
    descriptor: SyncDescriptor<any>
  ): void;
  register<T, Services extends BrandedService[]>(
    id: ServiceIdentifier<T>,
    ctorOrDescriptor: { new (...services: Services): T } | SyncDescriptor<any>,
    supportsDelayedInstantiation?: InstantiationType
  ): void;

  getDescriptors(): [ServiceIdentifier<any>, SyncDescriptor<any>][];
}

/**
 * 服务注册器，服务的表示和服务实现本身（描述符）注册进去，后续需要获取对应的描述符来创建服务实例
 */
export class ServiceRegistry implements IServiceRegistry {
  private _registry: [ServiceIdentifier<any>, SyncDescriptor<any>][] = [];
  private collection: ServiceCollection = new ServiceCollection();

  register<T, Services extends BrandedService[]>(
    id: ServiceIdentifier<T>,
    ctorOrDescriptor: SyncDescriptor<any> | (new (...services: Services) => T),
    supportsDelayedInstantiation?: InstantiationType | boolean
  ): void {
    if (!(ctorOrDescriptor instanceof SyncDescriptor)) {
      ctorOrDescriptor = new SyncDescriptor<T>(
        ctorOrDescriptor as new (...args: any[]) => T,
        [],
        Boolean(supportsDelayedInstantiation)
      );
    }

    this._registry.push([id, ctorOrDescriptor]);

    this.collection.set(id, ctorOrDescriptor);
  }

  getDescriptors() {
    return this._registry;
  }

  toServiceCollection() {
    return this.collection;
  }
}
