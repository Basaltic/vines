import { ContainerModule, ContainerModuleLoadOptions, Newable, ServiceIdentifier } from 'inversify';
import { Scope } from './scope';

export function token<T>(name: string) {
    return Symbol(name) as ServiceIdentifier<T>;
}

export type ClassProvider<T> = {
    token: ServiceIdentifier<T>;
    useClass: Newable<T>;
    /**
     * @default Scope.Singleton
     */
    scope?: Scope;
};

export type Provider<T = any> = Newable<T> | ClassProvider<T>;

export class Module extends ContainerModule {
    metadata: ModuleMetadata;
    constructor(metadata: ModuleMetadata, load: (options: ContainerModuleLoadOptions) => void | Promise<void>) {
        super(load);
        this.metadata = metadata;
    }
}

export interface ModuleMetadata {
    imports?: Module[];
    providers?: Provider[];
}

export function createModule(metadata: ModuleMetadata): Module {
    const module = new Module(metadata, (option) => {
        const providers = metadata.providers;
        if (providers && providers.length > 0) {
            for (const provider of providers) {
                if (typeof provider === 'function') {
                    option.bind(provider).toSelf().inSingletonScope();
                    continue;
                }

                const binder = option.bind(provider.token).to(provider.useClass);
                switch (provider.scope) {
                    case Scope.Request:
                        binder.inRequestScope();
                        break;
                    case Scope.Transient:
                        binder.inTransientScope();
                        break;
                    default:
                        binder.inRequestScope();
                        break;
                }
            }
        }
    });
    return module;
}
