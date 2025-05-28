import type { Container } from '../injection';
import { type Module, type Provider, isClassProvider, isValueProvider, isFactoryProvider } from './module.protocol';
import { Scope } from './scope';

/**
 * Scan the module & register the providers
 */
export class ModulesScanner {
    constructor(private container: Container) {}

    scan(module: Module) {
        if (module) {
            const { imports, providers } = module;

            this.scanProviders(providers || []);

            if (imports && imports.length > 0) {
                for (const moduleImport of imports) {
                    this.scan(moduleImport);
                }
            }
        }
    }

    scanProviders(providers: Provider[]) {
        if (providers && providers.length > 0) {
            if (providers) {
                for (const provider of providers) {
                    this.scanProvider(provider);
                }
            }
        }
    }

    scanProvider(provider: Provider) {
        if (isClassProvider(provider)) {
            switch (provider.scope) {
                case Scope.Transient:
                    this.container.bind(provider.token).to(provider.useClass);
                    break;
                default:
                    this.container.bind(provider.token).to(provider.useClass).inSingletonScope();
                    break;
            }
        } else if (isValueProvider(provider)) {
            this.container.bind(provider.token).toValue(provider.useValue);
        } else if (isFactoryProvider(provider)) {
            switch (provider.scope) {
                case Scope.Transient:
                    this.container.bind(provider.token).toFactory(provider.useFactory);
                    break;
                default:
                    this.container.bind(provider.token).toFactory(provider.useFactory).inSingletonScope();
                    break;
            }
        }
    }
}
