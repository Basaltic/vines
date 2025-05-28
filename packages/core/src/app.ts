import { ModulesScanner } from './module/scanner';
import type { Module } from './module';
import { token } from './injection';
import { Container, createResolve, createWire } from './injection';

/**
 *  const app = createApp(AppModule)
 */
export class VinessApp {
    private container: Container;

    constructor(container: Container) {
        this.container = container;
    }

    get wire() {
        return createWire(this.container);
    }

    get resolve() {
        return createResolve(this.container);
    }

    getContainer(): Container {
        return this.container;
    }
}

export const vinessAppToken = token<VinessApp>('VinessApp');

export function createApp(appModule: Module) {
    const container = new Container();
    const app = new VinessApp(container);
    container.bind(vinessAppToken).toValue(app);

    const scanner = new ModulesScanner(container);
    scanner.scan(appModule);

    return app;
}
